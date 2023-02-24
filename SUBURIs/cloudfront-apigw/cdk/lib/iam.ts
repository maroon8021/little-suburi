import { Stack, StackProps, aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";

export class Iam extends Stack {
  public readonly role: iam.Role;
  public readonly user: iam.User;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.user = new iam.User(this, "cloudfrontApigw-user", {
      userName: "cloudfrontApigw-user",
    });

    this.role = new iam.Role(this, "cloudfrontApigw-role", {
      roleName: `cloudfrontApigw-role`,
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"), // ここなんとかしたい
    });
  }
}
