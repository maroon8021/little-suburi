import { dynamicImport } from "./dynamic-import";

console.log("This file is imported for side effects");

const privateUnusedVariable = "I'm not exported or used";

dynamicImport();
