import Head from "next/head";
import Script from "next/script";

const Page = () => {
  const csp = `
  default-src 'self'; script-src 'self' 'unsafe-eval' https://cdnjs.cloudflare.com;
  `;

  const text = `
   "This is a test", 'This is a test', This is a test
  `;
  return (
    <div>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </Head>

      <h1>Content Security Policy</h1>
      <p>test escape</p>
      <p>{text}</p>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.7/axios.min.js" />

      <Script src="https://unpkg.com/axios/dist/axios.min.js" />
    </div>
  );
};

export default Page;
