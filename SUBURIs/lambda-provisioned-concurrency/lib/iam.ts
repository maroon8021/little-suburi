import { Stack, StackProps, aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";

export class Iam extends Stack {
  public readonly role: iam.Role;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.role = new iam.Role(this, "lambda-provisioned-concurrency-role", {
      roleName: `lambda-provisioned-concurrency-role`,
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"), // ここなんとかしたい
    });

    this.role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole" // to write logs on cloudwatch
      )
    );
  }
}
