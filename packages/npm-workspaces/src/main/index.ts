/* eslint-disable no-console */
import { calc } from "x-hoge-a";
import { calc2 } from "x-hoge-b";

const run = () => {
  const num = calc(1, 2);
  const num2 = calc2(num, 3);
  console.log("hoge");
  console.log(num2);
};

run();
