// This file isn't processed by Vite, see https://github.com/brillout/vite-plugin-ssr/issues/562
// Consequently:
//  - When changing this file, you needed to manually restart your server for your changes to take effect.
//  - To use your environment variables defined in your .env files, you need to install dotenv, see https://vite-plugin-ssr.com/env
//  - To use your path aliases defined in your vite.config.js, you need to tell Node.js about them, see https://vite-plugin-ssr.com/path-aliases

import express from "express";
import compression from "compression";
import { renderPage } from "vite-plugin-ssr/server";
import { root } from "./root.js";
import { router } from "./api/router.js";

const isProduction = process.env.NODE_ENV === "production";

startServer();

async function startServer() {
  const app = express();

  app.use(compression());

  // Vite integration
  if (isProduction) {
    // In production, we need to serve our static assets ourselves.
    // (In dev, Vite's middleware serves our static assets.)
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    // We instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We instantiate it only in development. (It isn't needed in production and it
    // would unnecessarily bloat our production server.)
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  // ...
  // Other middlewares (e.g. some RPC middleware such as Telefunc)
  // ...
  // app.all("/api", async (req, res) => {
  //   const context = {};
  //   const httpResponse = await telefunc({
  //     url: req.originalUrl,
  //     method: req.method,
  //     body: req.body,
  //     context,
  //   });
  //   const { body, statusCode, contentType } = httpResponse;
  //   res.status(statusCode).type(contentType).send(body);
  // });

  app.use("/api", router);

  // Vite-plugin-ssr middleware. It should always be our last middleware (because it's a
  // catch-all middleware superseding any middleware placed after it).
  app.get("*", async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    } else {
      const { body, statusCode, headers, earlyHints } = httpResponse;
      if (res.writeEarlyHints)
        res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
      headers.forEach(([name, value]) => res.setHeader(name, value));
      res.status(statusCode);
      // For HTTP streams use httpResponse.pipe() instead, see https://vite-plugin-ssr.com/stream
      res.send(body);
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
