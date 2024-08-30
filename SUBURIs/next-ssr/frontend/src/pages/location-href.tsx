import { useEffect } from "react";

// sleep
const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const Page = () => {
  useEffect(() => {
    const moveYahoo = () => {
      console.log("Location Href: redirecting to yahoo.com");
      window.location.href = "https://www.yahoo.com";
      console.log("Location Href: end");
    };
    const start = async () => {
      console.log("Location Href: start");
      await sleep(3000);
      console.log("Location Href: redirecting to google.com");
      window.location.href = "https://www.google.com";
      console.log("Location Href: end");
      await sleep(1000);
      // console.log("Location Href: after sleep");
      moveYahoo();

      // await sleep(3000);

      // window.location.href = "https://developer.mozilla.org/ja/docs/Web";

      // await sleep(3000);

      // window.location.href = "https://react.dev/";
      console.log("Location Href: after sleep");
    };
    start();
  }, []);
  return (
    <>
      <h1>Location Href</h1>
    </>
  );
};

export default Page;
