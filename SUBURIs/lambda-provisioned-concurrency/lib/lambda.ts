import * as cdk from "aws-cdk-lib";
import {
  aws_lambda as lambda,
  Duration,
  aws_logs as logs,
  aws_iam as iam,
} from "aws-cdk-lib";
import { Schedule } from "aws-cdk-lib/aws-events";
import { Construct } from "constructs";

type Props = {
  role: iam.Role;
  code: lambda.Code;
  functionName: string;
  handler: string;
} & cdk.StackProps;

export class Lambda extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);
    const { role, code, functionName, handler } = props;

    const lambdaFunction = new lambda.Function(
      this,
      "lambda-provisioned-concurrency-simple-lambda",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        functionName,
        code,
        handler,
        role,
        timeout: Duration.seconds(30),
        logRetention: logs.RetentionDays.ONE_WEEK,
      }
    );

    lambdaFunction.addFunctionUrl();
  }
}

export class LambdaWithProvisionedConcurrency extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { role, code, functionName, handler } = props;

    const lambdaFunction = new lambda.Function(
      this,
      "lambda-provisioned-concurrency-with-provisioned-concurrency",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        functionName,
        code,
        handler,
        role,
        timeout: Duration.seconds(30),
        logRetention: logs.RetentionDays.ONE_WEEK,
      }
    );

    lambdaFunction.addFunctionUrl();

    // currentVersion でエイリアスを作成
    const alias = lambdaFunction.currentVersion.addAlias("currentVersion");

    // スケーラブルターゲットを作成
    const scalableAttribute = alias.addAutoScaling({
      minCapacity: 1,
      maxCapacity: 1,
    });

    // JST の 20:00 にスケールインするアクションを作成
    scalableAttribute.scaleOnSchedule("sampleLambdaScaleIn", {
      minCapacity: 0,
      maxCapacity: 0,
      schedule: Schedule.cron({ minute: "0", hour: "11" }),
    });

    // JST の 08:00 にスケールアウトするアクションを作成
    scalableAttribute.scaleOnSchedule("sampleLambdaScaleOut", {
      minCapacity: 1,
      maxCapacity: 1,
      schedule: Schedule.cron({ minute: "0", hour: "23" }),
    });
  }
}
