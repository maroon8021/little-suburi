import { Suspense, lazy } from "react";

const LazyText = lazy(() => delayForDemo(import("../components/LazyText")));
const Loading = () => {
  return <p>Loading...</p>;
};

const Page = () => {
  console.log("Page: start");
  return (
    <>
      <h1>Lazy Test?</h1>
      <Suspense fallback={<Loading />}>
        <LazyText />
      </Suspense>
    </>
  );
};

export default Page;

function delayForDemo(promise: Promise<any>) {
  const isServer = typeof window === "undefined";
  const time = isServer ? 0 : 5000;
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  }).then(() => promise);
}
