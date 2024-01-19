#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { S3 } from "../lib/s3";
import { CloudFront } from "../lib/cloudfront";

const env: cdk.Environment = {
  region: "ap-northeast-1",
};

const app = new cdk.App();

const { bucket } = new S3(app, "ViteReactStaticS3", {
  env,
  bucketName: "stocka-next-bucket",
});

new CloudFront(app, "ViteReactStaticCloudfront", {
  env,
  bucket,
});
