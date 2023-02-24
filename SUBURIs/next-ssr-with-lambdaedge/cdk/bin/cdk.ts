#!/usr/bin/env node
import "source-map-support/register";

import { Iam } from "../lib/iam";
import { Lambda } from "../lib/lambda";

import { App, Environment, aws_lambda as lambda } from "aws-cdk-lib";
import { CloudFront } from "../lib/cloudfront";

const app = new App();

const env: Environment = {
  region: "ap-northeast-1",
};

const { role } = new Iam(app, "nextSsrWithLambdaEdgeIam", {
  env,
});

const { lambdaFunction } = new Lambda(app, "nextSsrWithLambdaEdgeLambda", {
  env,
  role,
  functionName: "next-ssr-with-lambdaedge",
  handler: "lambda.handler",
  code: lambda.Code.fromAsset(`${__dirname}/../../frontend/.next/standalone`),
});

new CloudFront(app, "nextSsrWithLambdaEdgeCloudfront", {
  env,
  edgeFunction: lambdaFunction,
});
