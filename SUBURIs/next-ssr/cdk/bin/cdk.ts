#!/usr/bin/env node
import "source-map-support/register";

import { Iam } from "../lib/iam";
import { Lambda, LambdaContainer } from "../lib/lambda";
import { ApiGateway } from "../lib/api-gateway";

import { App, Environment, aws_lambda as lambda } from "aws-cdk-lib";
import { CloudFront } from "../lib/cloudfront";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import { S3 } from "../lib/s3";

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

const { lambdaFunction: lambdaFunctionWithContainer } = new LambdaContainer(
  app,
  "nextSsrLambdaWithLambdaContainer",
  {
    env,
    role,
    functionName: "next-ssr-with-container",
    code: lambda.DockerImageCode.fromImageAsset(`${__dirname}/../../frontend`, {
      platform: Platform.LINUX_AMD64,
    }),
  }
);

const { api: api1 } = new ApiGateway(app, "nextSsrApiGateway", {
  env,
  lambdaFunction,
  restApiName: "next-ssr",
});

const { api: api2 } = new ApiGateway(
  app,
  "nextSsrApiGatewayWithLambdaContainer",
  {
    env,
    lambdaFunction: lambdaFunctionWithContainer,
    restApiName: "next-ssr-with-lambda-container",
  }
);

const { bucket } = new S3(app, "nextSsrS3", {
  env,
  bucketName: "next-ssr-static-321",
});

new CloudFront(app, "nextSsrCloudfront", {
  env,
  api: api1,
  bucket,
});

new CloudFront(app, "nextSsrCloudfrontWithLambdaContainer", {
  env,
  api: api2,
  bucket,
});
