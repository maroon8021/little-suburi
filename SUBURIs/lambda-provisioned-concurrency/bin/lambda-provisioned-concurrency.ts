#!/usr/bin/env node
import "source-map-support/register";

import { Iam } from "../lib/iam";
import { Lambda, LambdaWithProvisionedConcurrency } from "../lib/lambda";

import { App, Environment, aws_lambda as lambda } from "aws-cdk-lib";

const app = new App();

const env: Environment = {
  region: "ap-northeast-1",
};

const { role } = new Iam(app, "LambdaProvisionedConcurrencyIam", {
  env,
});

new Lambda(app, "LambdaProvisionedConcurrencyLambda", {
  env,
  role,
  functionName: "lambda-provisioned-concurrency-simple-lambda",
  handler: "lambda.handler",
  code: lambda.Code.fromAsset(`${__dirname}/../`),
});

new LambdaWithProvisionedConcurrency(
  app,
  "LambdaProvisionedConcurrencyLambdaWithProvisionedConcurrency",
  {
    env,
    role,
    functionName: "lambda-provisioned-concurrency-with-provisioned-concurrency",
    handler: "lambda.handler",
    code: lambda.Code.fromAsset(`${__dirname}/../`),
  }
);
