import {
  Stack,
  StackProps,
  Duration,
  aws_lambda as lambda,
  aws_iam as iam,
  aws_logs as logs,
} from "aws-cdk-lib";
import { Construct } from "constructs";

type LambdaProps = {
  role: iam.Role;
  code: lambda.Code;
  functionName: string;
  handler: string;
} & StackProps;

export class Lambda extends Stack {
  public readonly lambdaFunction: lambda.Function;
  constructor(parent: Construct, id: string, props: LambdaProps) {
    super(parent, id, props);

    const { code, functionName, handler, role } = props;

    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole" // to write logs on cloudwatch
      )
    );

    this.lambdaFunction = new lambda.Function(this, "next-ssr-lambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      functionName,
      code,
      handler,
      role,
      timeout: Duration.seconds(30),
      logRetention: logs.RetentionDays.ONE_WEEK,
    });
  }
}

type LambdaContainerProps = {
  role: iam.Role;
  code: lambda.DockerImageCode;
  functionName: string;
} & StackProps;

export class LambdaContainer extends Stack {
  public readonly lambdaFunction: lambda.Function;
  constructor(parent: Construct, id: string, props: LambdaContainerProps) {
    super(parent, id, props);

    const { code, functionName, role } = props;

    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole" // to write logs on cloudwatch
      )
    );

    this.lambdaFunction = new lambda.DockerImageFunction(
      this,
      "next-ssr-lambda-container",
      {
        functionName,
        code,
        role,
        timeout: Duration.seconds(30),
        logRetention: logs.RetentionDays.ONE_WEEK,
      }
    );
  }
}
