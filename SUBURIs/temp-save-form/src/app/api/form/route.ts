import { NextResponse } from "next/server";
import fs from "fs";

type Schema = {
  name: string | undefined;
  age: number | undefined;
  address: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  birthday: Date | undefined;
};

let formData: Schema = {
  name: undefined,
  age: undefined,
  address: undefined,
  email: undefined,
  phone: undefined,
  birthday: undefined,
};

export async function GET() {
  console.log("GET:");
  const formData = JSON.parse(
    fs.readFileSync("./src/app/api/form/formData.json", "utf8")
  ) as Schema;
  console.log("in GET");
  console.log(formData);
  return NextResponse.json(formData);
}

export async function PUT(request: Request) {
  const body = (await request.json()) as Schema;
  console.log("PUT:", body);
  fs.writeFileSync(
    "./src/app/api/form/formData.json",
    JSON.stringify(body, null, 2)
  );
  return NextResponse.json(body);
}
