import {
  Stack,
  StackProps,
  Duration,
  aws_lambda as lambda,
  aws_iam as iam,
  aws_logs as logs,
  aws_cloudfront as cloudfront,
} from "aws-cdk-lib";
import { Construct } from "constructs";

type LambdaProps = {
  role: iam.Role;
  code: lambda.Code;
  functionName: string;
  handler: string;
} & StackProps;

export class Lambda extends Stack {
  public readonly lambdaFunction: cloudfront.experimental.EdgeFunction;
  constructor(parent: Construct, id: string, props: LambdaProps) {
    super(parent, id, props);

    const { code, functionName, handler, role } = props;

    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole" // to write logs on cloudwatch
      )
    );

    this.lambdaFunction = new cloudfront.experimental.EdgeFunction(
      this,
      "next-ssr-with-lambdaedge-lambda",
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        functionName,
        code,
        handler,
        role,
        timeout: Duration.seconds(29),
        logRetention: logs.RetentionDays.ONE_WEEK,
      }
    );
  }
}
