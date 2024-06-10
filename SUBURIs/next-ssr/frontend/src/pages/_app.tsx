import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "../components/ListState";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
