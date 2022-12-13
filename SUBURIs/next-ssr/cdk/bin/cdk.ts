#!/usr/bin/env node
import "source-map-support/register";

import { Iam } from "../lib/iam";
import { Lambda } from "../lib/lambda";
import { ApiGateway } from "../lib/api-gateway";

import { App, Environment, aws_lambda as lambda } from "aws-cdk-lib";

const app = new App();

const env: Environment = {
  region: "ap-northeast-1",
};

const { role } = new Iam(app, "nextSsrIam", {
  env,
});

const { lambdaFunction } = new Lambda(app, "nextSsrLambda", {
  env,
  role,
  functionName: "next-ssr",
  handler: "lambda.handler",
  code: lambda.Code.fromAsset(`${__dirname}/../../frontend/.next/standalone`),
});

new ApiGateway(app, "nextSsrApiGateway", {
  env,
  lambdaFunction,
});
