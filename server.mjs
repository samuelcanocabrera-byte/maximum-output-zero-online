import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {randomBytes, randomInt} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

// Zero third-party dependencies. The host's browser runs the original game simulation.
// This room service transports inputs and snapshots between two or three browsers.
const PORT = Number(process.env.PORT || 3000);
const DIR = path.dirname(fileURLToPath(import.meta.url));
const rooms = new Map();
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const actions = new Set(['left','right','up','down','attack','skill','guard','cycle','super','domain','rct','dash']);
const key = () => randomBytes(24).toString('hex');
function code(){let c;do{c=Array.from({length:6},()=>alphabet[randomInt(alphabet.length)]).join('')}while(rooms.has(c));return c}
const json = (res, status, object) => {res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Access-Control-Allow-Origin':'*'});res.end(JSON.stringify(object))};
const emit = (res, type, payload) => {if(res?.writable&&!res.destroyed){try{res.write(`event: ${type}\ndata: ${JSON.stringify(payload)}\n\n`)}catch{}}};
function roomView(r){return {code:r.code,mode:r.mode,status:r.status,players:r.members.map((m,i)=>m?{slot:i,name:m.name,character:m.character,ready:m.ready,online:!!m.stream}:null)}}
function publish(r,type,payload,except=-1){for(let i=0;i<r.members.length;i++){const m=r.members[i];if(m&&m.stream&&i!==except)emit(m.stream,type,payload)}}
function publishLobby(r){publish(r,'lobby',roomView(r))}
function session(body){const r=rooms.get(String(body.room||'').trim().toUpperCase());if(!r)return null;const i=r.members.findIndex(m=>m&&m.token===body.token);if(i<0)return null;return {r,i,m:r.members[i]}}
async function bodyJSON(req,limit=130000){let chunks=[],total=0;for await(const chunk of req){total+=chunk.length;if(total>limit)throw new Error('Message too large');chunks.push(chunk)}return JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}')}
function safeName(n){return String(n||'Sorcerer').replace(/[<>\r\n]/g,'').trim().slice(0,22)||'Sorcerer'}
function validChar(v){return Number.isInteger(v)&&v>=0&&v<=5}
function no(res,msg,status=400){json(res,status,{error:msg})}
function disconnectStream(r,i,res){const m=r.members[i];if(m?.stream===res){m.stream=null;publishLobby(r)}}
async function api(req,res,url){
 try{
  if(req.method==='POST'){
   const limit=url.pathname==='/api/snapshot'?600000:130000;
   const data=await bodyJSON(req,limit);
   if(url.pathname==='/api/create'){
    const mode=data.mode===3?3:2;
    const r={code:code(),mode,status:'lobby',members:Array(mode).fill(null),born:Date.now(),seen:Date.now()};
    r.members[0]={token:key(),name:safeName(data.name),character:validChar(data.character)?data.character:0,ready:false,stream:null};
    rooms.set(r.code,r);return json(res,200,{room:r.code,token:r.members[0].token,slot:0,host:true});
   }
   if(url.pathname==='/api/join'){
    const r=rooms.get(String(data.room||'').trim().toUpperCase());
    if(!r)return no(res,'Room not found',404);
    if(r.status!=='lobby')return no(res,'Match already started. Join a new room.',409);
    let i=r.members.findIndex(m=>m===null);if(i<0)return no(res,'Room is full',409);
    r.members[i]={token:key(),name:safeName(data.name),character:validChar(data.character)?data.character:1,ready:false,stream:null};r.seen=Date.now();publishLobby(r);
    return json(res,200,{room:r.code,token:r.members[i].token,slot:i,host:false});
   }
   const s=session(data);if(!s)return no(res,'Room session expired. Create or join again.',403);
   const {r,i,m}=s;r.seen=Date.now();
   if(url.pathname==='/api/resume'){
    if(i===0&&r.status==='playing'){
      r.status='lobby';for(const p of r.members)if(p)p.ready=false;
      publish(r,'return-lobby',roomView(r));publishLobby(r);
    }
    return json(res,200,{room:r.code,token:m.token,slot:i,host:i===0});
   }
   if(url.pathname==='/api/leave'){
    if(i===0){publish(r,'closed',{reason:'The host closed this room'},0);for(const p of r.members)if(p?.stream)try{p.stream.end()}catch{};rooms.delete(r.code)}
    else {r.members[i]=null;if(r.status==='playing'){r.status='lobby';for(const p of r.members)if(p)p.ready=false;publish(r,'return-lobby',roomView(r))}publishLobby(r)}
    return json(res,200,{ok:true});
   }
   if(url.pathname==='/api/character'){
    if(r.status!=='lobby')return no(res,'Cannot switch characters during a match');
    if(!validChar(data.character))return no(res,'Invalid character');
    m.character=data.character;m.ready=false;publishLobby(r);return json(res,200,{ok:true});
   }
   if(url.pathname==='/api/ready'){
    if(r.status!=='lobby')return no(res,'Match already started');
    m.ready=!!data.ready;publishLobby(r);return json(res,200,{ok:true});
   }
   if(url.pathname==='/api/start'){
    if(i!==0)return no(res,'Only the host can start or rematch',403);
    if(!r.members.every(p=>p&&p.ready&&p.stream))return no(res,'All player slots must be filled, connected and ready');
    r.status='playing';publish(r,'started',roomView(r));return json(res,200,{ok:true});
   }
   if(url.pathname==='/api/lobby'){
    if(i!==0)return no(res,'Only host can return to lobby',403);
    r.status='lobby';for(const x of r.members){if(x)x.ready=false};publish(r,'return-lobby',roomView(r));publishLobby(r);return json(res,200,{ok:true});
   }
   if(url.pathname==='/api/card'){
    if(r.status!=='playing'||!Number.isInteger(data.index)||data.index<0||data.index>10)return no(res,'Invalid card');
    if(i!==0&&r.members[0]?.stream)emit(r.members[0].stream,'card',{slot:i,index:data.index});
    return json(res,200,{ok:true});
   }
   if(url.pathname==='/api/wager'){
    if(r.status!=='playing'||!Number.isInteger(data.index)||data.index<0||data.index>4)return no(res,'Invalid wager');
    if(i!==0&&r.members[0]?.stream)emit(r.members[0].stream,'wager',{slot:i,index:data.index});
    return json(res,200,{ok:true});
   }
   if(url.pathname==='/api/input'){
    if(r.status!=='playing'||!actions.has(data.action)||typeof data.down!=='boolean')return json(res,200,{ok:false});
    const host=r.members[0];if(i!==0&&host?.stream)emit(host.stream,'input',{slot:i,action:data.action,down:data.down});
    return json(res,200,{ok:true});
   }
   if(url.pathname==='/api/snapshot'){
    if(i!==0||r.status!=='playing')return no(res,'Only match host can submit state',403);
    if(!data.state||typeof data.state!=='object'||!Array.isArray(data.state.players))return no(res,'Invalid state');
    publish(r,'snapshot',data.state,0);return json(res,200,{ok:true});
   }
   return no(res,'Unknown action',404);
  }
  if(req.method==='GET'&&url.pathname==='/events'){
   const s=session({room:url.searchParams.get('room'),token:url.searchParams.get('token')});
   if(!s)return no(res,'Room session not found',403);
   const {r,i,m}=s;
   if(m.stream&&m.stream!==res){try{m.stream.end()}catch{}}
   res.writeHead(200,{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-cache, no-transform','Connection':'keep-alive','X-Accel-Buffering':'no','Access-Control-Allow-Origin':'*'});
   res.write(': connected\n\n');m.stream=res;r.seen=Date.now();emit(res,'lobby',roomView(r));
   res.on('close',()=>disconnectStream(r,i,res));publishLobby(r);return;
  }
  if(req.method==='GET'&&(url.pathname==='/'||url.pathname==='/index.html')){
    const html=await readFile(path.join(DIR,'public','index.html'));
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(html);return;
  }
  if(req.method==='GET'&&url.pathname==='/health'){return json(res,200,{ok:true,rooms:rooms.size})}
  return no(res,'Not found',404);
 }catch(err){no(res,err.message||'Server error',err.message==='Message too large'?413:400)}
}
const server=http.createServer((req,res)=>{
 const url=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`);
 api(req,res,url).catch(err=>{console.error(err);if(!res.headersSent)no(res,'Unexpected server error',500)});
});
setInterval(()=>{
 const now=Date.now();for(const r of rooms.values()){
  if(now-r.seen>4*60*60*1000){for(const m of r.members)if(m?.stream)try{m.stream.end()}catch{};rooms.delete(r.code);continue}
  for(const m of r.members)if(m?.stream&&!m.stream.destroyed)try{m.stream.write(': keepalive\n\n')}catch{}
 }
},25000).unref();
server.listen(PORT,'0.0.0.0',()=>console.log(`MAXIMUM OUTPUT: ZERO multiplayer listening at http://localhost:${PORT}`));
