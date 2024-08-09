"use client";
import { Suspense, lazy } from "react";

console.log("lazy.tsx: start");
const LazyText = lazy(() => delayForDemo(import("./LazyText")));
console.log("LazyText", LazyText);
console.log("lazy.tsx: end");

const Loading = () => {
  return <p>Loading...</p>;
};

export const LazyParent = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyText />
    </Suspense>
  );
};

function delayForDemo(promise: Promise<any>) {
  const isServer = typeof window === "undefined";
  const time = isServer ? 0 : 5000;
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  }).then(() => promise);
}
