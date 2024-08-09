import React, { use, useEffect, useState } from "react";

const fetchData = async () => {
  // Simulate a delay
  //await new Promise((resolve) => setTimeout(resolve, 5000));
  return "Lazy loaded text from `fetchData`";
};

export const LazyText = () => {
  console.log("LazyText: start");
  const [text, setText] = useState<string>("");
  useEffect(() => {
    fetchData().then((d) => setText(d));
  }, []);
  console.log("LazyText: end");

  return <div>{text}</div>;
};

export default LazyText;
