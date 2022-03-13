import "../styles/globals.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import type { AppProps } from "next/app";

Sentry.init({
  dsn: "https://37e22d50a4da44cb9ea5df11eae050d4@o1166130.ingest.sentry.io/6256432",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
