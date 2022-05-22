import "../styles/globals.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import type { AppProps } from "next/app";

Sentry.init({
  dsn: "",
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
