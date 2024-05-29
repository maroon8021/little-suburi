import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "../components/ListState";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
