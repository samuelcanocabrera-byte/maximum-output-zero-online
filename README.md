# MAXIMUM OUTPUT: ZERO V8.0 / ASCENSION

A free, original browser-based anime-inspired 2D fighting game with six distinct fighters, selectable arenas, Domain Expansions, counters, juggle combos, original music and local/online multiplayer.

**Start:** read `START_HERE.txt`.

## Play

Run `npm start` in this directory to start the multiplayer web server, then open `http://localhost:3000`. Local play can also work by opening `public/index.html` directly, with the MP3 music files kept in `public/music/`.

Choose Local Versus on the title page, select players and fighters, choose a battlefield, and begin the match. For online multiplayer, open Online Room, create a 2- or 3-person room, invite the other players using its link, select the arena as host, and begin when all players are connected and ready.

## Main controls

| Action | Player 1 | Player 2 | Player 3 |
|---|---|---|---|
| Move | A / D | Left / Right | 4 / 6 |
| Jump / launcher modifier | W | Up | 8 |
| Crouch / sweep modifier | S | Down | 5 |
| Attack | F | J | 1 |
| Technique | G | K | 2 |
| Guard | H | L | 3 |
| Cycle | Q | U | 7 |
| Domain | E | O | 0 |
| Maximum | R | I | 9 |
| RCT / CTR | C | P | Period |
| Dash | Left Shift | Right Shift | Numpad Enter |

For a perfect-guard counter, press Guard just before contact, then Attack when COUNTER READY appears. Hold Up + Attack for an air launcher, or Down + Attack for a sweep. Press Guard + Domain to cast Simple Domain. Detailed character-specific controls remain in the game's **CONTROLS** section.

For phones/tablets, use landscape mode. Touch controls appear during fights. Local touch controls are for P1. Other friends should join through separate online devices.

## Domains

Domain activation: **100 Awakening, 35 Cursed Energy**. Joining a counter Domain clash during the response window: **35 Awakening, 28 Cursed Energy**. The game does not consume resources when a Domain action is ineligible. In a clash, the barriers collide for a short intro before the timed fight with virtual damage; real HP is frozen for the clash.

## Music

Four original instrumental loops, shipped locally as MP3s in `public/music/`. Set the soundtrack and SFX volumes in the **AUDIO** menu. Audio starts after the first gesture due to browser autoplay rules. JJK's copyrighted soundtrack is not included.

See `ASCENSION_UPDATE.md` for full change notes and testing limitations, and `DEPLOY_ON_RENDER.md` for an online deployment option.
