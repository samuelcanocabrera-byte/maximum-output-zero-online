// Maximum Output: Zero — static hosting worker.
// Serves the game build from /public and maps the pretty routes the game uses.
// NOTE: never request "*.html" from ASSETS — its html_handling canonicalises
// those to extensionless URLs, which would bounce the browser in a loop.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // The socket room server is a Node process; it does not run here.
    if (path.startsWith('/api/')) {
      return new Response(
        JSON.stringify({ error: 'online_requires_socket_server' }),
        { status: 503, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } }
      );
    }

    let asset = path;
    if (path === '/3d' || path === '/3d/') asset = '/3d-arena';
    else if (path === '/3d-camera' || path === '/3d-camera/') asset = '/3d-spike';
    else if (path === '/2d' || path === '/2d/') asset = '/';

    if (asset !== path) {
      const target = new URL(asset, url);
      target.search = url.search;
      return env.ASSETS.fetch(new Request(target.toString(), request));
    }

    const res = await env.ASSETS.fetch(request);
    if (res.status !== 404) return res;

    if ((request.headers.get('accept') || '').includes('text/html')) {
      const home = new URL('/', url);
      return env.ASSETS.fetch(new Request(home.toString(), request));
    }
    return res;
  }
};
