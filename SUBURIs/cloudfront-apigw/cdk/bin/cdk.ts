#!/usr/bin/env node
import "source-map-support/register";

import { Iam } from "../lib/iam";
import { Lambda } from "../lib/lambda";
import { ApiGateway } from "../lib/api-gateway";

import { App, Environment, aws_lambda as lambda } from "aws-cdk-lib";
import { CloudFront } from "../lib/cloudfront";
import { ApiGateway2, ApiGateway2AttachPolicy } from "../lib/api-gateway2";

const app = new App();

const env: Environment = {
  region: "ap-northeast-1",
};

const { role } = new Iam(app, "cloudfrontApigwIam", {
  env,
});

const { lambdaFunction } = new Lambda(app, "cloudfrontApigwLambda", {
  env,
  role,
  functionName: "cloudfrontApigw",
  handler: "index.handler",
  code: lambda.Code.fromAsset(`${__dirname}/../../backend`),
});

const { api } = new ApiGateway(app, "cloudfrontApigwApiGateway", {
  env,
  lambdaFunction,
});

const { api: api2, apiKeyValue } = new ApiGateway2(
  app,
  "cloudfrontApigwApiGateway2",
  {
    env,
    lambdaFunction,
  }
);

console.log("apiKeyValue", apiKeyValue);

const { distribution } = new CloudFront(app, "cloudfrontApigwCloudfront", {
  env,
  api,
  api2,
  apiKey: apiKeyValue,
});

new ApiGateway2AttachPolicy(app, "cloudfrontApigwAttachPolicy", {
  env,
  api: api2,
  cloudrontArn: `arn:aws:cloudfront::108944956819:distribution/${distribution.distributionId}`,
});
