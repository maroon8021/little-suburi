import { usedFunction } from "./utils";
import "./side-effects";
import { UsedInterface } from "./types";

function main() {
  const data: UsedInterface = {
    id: 1,
    name: "Test",
  };
  console.log(usedFunction(data));
}

main();
