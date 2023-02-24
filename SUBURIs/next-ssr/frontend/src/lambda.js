process.chdir(__dirname);
process.env.NODE_ENV = "production";

const path = require("path");
const serverlessHttp = require("serverless-http");

const NextServer = require("next/dist/server/next-server").default;

const nextServer = new NextServer({
  hostname: "localhost",
  dir: path.join(__dirname),
  dev: false,
  customServer: false,
  conf: {
    env: {},
    webpack: null,
    webpackDevMiddleware: null,
    eslint: { ignoreDuringBuilds: false },
    typescript: { ignoreBuildErrors: false, tsconfigPath: "tsconfig.json" },
    distDir: "./.next",
    cleanDistDir: true,
    assetPrefix: "",
    configOrigin: "next.config.js",
    useFileSystemPublicRoutes: true,
    generateEtags: true,
    pageExtensions: ["tsx", "ts", "jsx", "js"],
    target: "server",
    poweredByHeader: true,
    compress: true,
    analyticsId: "",
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      path: "/_next/image",
      loader: "default",
      loaderFile: "",
      domains: [],
      disableStaticImages: false,
      minimumCacheTTL: 60,
      formats: ["image/webp"],
      dangerouslyAllowSVG: false,
      contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
      remotePatterns: [],
      unoptimized: false,
    },
    devIndicators: {
      buildActivity: true,
      buildActivityPosition: "bottom-right",
    },
    onDemandEntries: { maxInactiveAge: 15000, pagesBufferLength: 2 },
    amp: { canonicalBase: "" },
    basePath: "",
    sassOptions: {},
    trailingSlash: false,
    i18n: null,
    productionBrowserSourceMaps: false,
    optimizeFonts: true,
    excludeDefaultMomentLocales: true,
    serverRuntimeConfig: {},
    publicRuntimeConfig: {},
    reactStrictMode: true,
    httpAgentOptions: { keepAlive: true },
    outputFileTracing: true,
    staticPageGenerationTimeout: 60,
    swcMinify: true,
    output: "standalone",
    experimental: {
      middlewarePrefetch: "flexible",
      optimisticClientCache: true,
      manualClientBasePath: false,
      legacyBrowsers: false,
      newNextLinkBehavior: true,
      cpus: 9,
      sharedPool: true,
      profiling: false,
      isrFlushToDisk: true,
      workerThreads: false,
      pageEnv: false,
      optimizeCss: false,
      nextScriptWorkers: false,
      scrollRestoration: false,
      externalDir: false,
      disableOptimizedLoading: false,
      gzipSize: true,
      swcFileReading: true,
      craCompat: false,
      esmExternals: true,
      appDir: false,
      isrMemoryCacheSize: 52428800,
      fullySpecified: false,
      outputFileTracingRoot: "",
      swcTraceProfiling: false,
      forceSwcTransforms: false,
      largePageDataBytes: 128000,
      enableUndici: false,
      adjustFontFallbacks: false,
      adjustFontFallbacksWithSizeAdjust: false,
      trustHostHeader: false,
    },
    configFileName: "next.config.js",
  },
});

const getErrMessage = (e) => ({
  message: "Server failed to respond.",
  details: e,
});

const nextHandler = nextServer.getRequestHandler();

const handler = async (event, _context, callback) => {
  console.log(event);
  console.log(JSON.stringify(event));

  console.log(_context);

  /**
   * /dist/server/base-http/index.d.ts
   * BaseNextRequest
   */
  const request = {
    method: event.httpMethod,
    url: event.path,
    body: event.body,
    headers: event.headers,
  };

  /**
   * /dist/server/base-http/index.d.ts
   * BaseNextResponse
   */
  const response = {
    send: () => callback(),
    body: (s) => {
      console.log(s);
      return this;
    },
    setHeader: () => {},
  };

  const handler = nextServer.getRequestHandler();

  const result = await handler(request, response);
  console.log(result);
};

const server = serverlessHttp(
  async (req, res) => {
    req.url = req.url === "/" ? req.url : `/${req.url}`;
    console.log(req);
    console.log(res);
    await nextHandler(req, res).catch((e) => {
      // Log into Cloudwatch for easier debugging.
      console.error(`NextJS request failed due to:`);
      console.error(e);

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(getErrMessage(e), null, 3));
    });
  },
  {
    provider: "aws",
    basePath: "/",
  }
);

exports.handler = server;
