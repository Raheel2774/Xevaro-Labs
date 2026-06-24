// One Cloudflare Worker serves every demo from KV by slug.
// This is the scalable hosting model: 7,500 demos/month = one Worker, not
// 7,500 deploys. Build + upload demos with build-demos.mjs.
//
// Deploy:
//   cd outbound/demo
//   wrangler kv namespace create DEMOS         # once; put the id in wrangler.demo.toml
//   wrangler deploy -c wrangler.demo.toml
//   wrangler kv bulk put ../data/kv-demos.json --binding DEMOS -c wrangler.demo.toml

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const m = url.pathname.match(/^\/d\/([a-z0-9-]+)\/?$/);
    if (m) {
      const html = await env.DEMOS.get(`DEMO:${m[1]}`);
      if (html) {
        return new Response(html, {
          headers: { "content-type": "text/html;charset=utf-8", "cache-control": "public,max-age=300" },
        });
      }
      return new Response("Demo not found.", { status: 404 });
    }
    return new Response(
      "<!doctype html><meta charset=utf-8><title>Xevaro demos</title>" +
        "<body style='font-family:sans-serif;padding:40px'><h1>Xevaro Labs</h1>" +
        "<p>Personalized demo sites are served at <code>/d/&lt;slug&gt;</code>.</p>",
      { headers: { "content-type": "text/html;charset=utf-8" }, status: 200 }
    );
  },
};
