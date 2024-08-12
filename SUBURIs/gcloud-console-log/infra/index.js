import express from "express";
const app = express();

app.get("/", (req, res) => {
  const version = process.env.BUILD_DATE || "no";
  console.log("version:", version);
  const name = process.env.NAME || "World";
  // console.log("--------------------");
  // console.log("req");
  // console.log(req);

  // console.log("--------------------");
  // console.log("req", req);

  // console.log("--------------------");
  // console.log("req: %o", req);

  const nestedObject = {
    key1: "value1",
    key2: "value2",
    key3: {
      key4: "value4",
      key5: "value5",
    },
  };

  console.log("--------------------");

  console.log("nestedObject:", nestedObject);

  console.log("--------------------");

  console.log(
    "nestedObject-with JSON.stringfy: ",
    JSON.stringify(nestedObject)
  );

  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
