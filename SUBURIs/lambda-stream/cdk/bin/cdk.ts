#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Lambda } from "../lib/lambda";

const app = new cdk.App();
new Lambda(app, "StreamLambda");
