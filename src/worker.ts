export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight if needed
    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }

    // Proxy /api/uat requests to primarii.registro.ro to prevent CORS issues on edge
    if (url.pathname.startsWith('/api/uat')) {
      const targetUrl = new URL(url.pathname + url.search, 'https://primarii.registro.ro');
      const proxyRequest = new Request(targetUrl.toString(), {
        method: request.method,
        headers: request.headers,
      });

      const response = await fetch(proxyRequest);
      const responseHeaders = new Headers(response.headers);
      responseHeaders.set('Access-Control-Allow-Origin', '*');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    }

    // Serve static SPA assets from ./dist via Cloudflare Workers Static Assets binding
    return env.ASSETS.fetch(request);
  },
};
