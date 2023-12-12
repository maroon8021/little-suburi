import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as elbv2_targets from "aws-cdk-lib/aws-elasticloadbalancingv2-targets";

export class LambdaAlbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new VPC
    const vpc = new ec2.Vpc(this, "MyVpc", {
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          subnetType: ec2.SubnetType.PUBLIC,
          name: "Public",
          cidrMask: 24,
        },
      ],
    });

    // Create a new Lambda function with inline code
    const myLambda = new lambda.Function(this, "MyLambda", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
        exports.handler = async function(event, context) {
          console.log("EVENT: \\n" + JSON.stringify(event, null, 2));
          return context.logStreamName;
        };
      `),
    });

    // Create a new Application Load Balancer
    const lb = new elbv2.ApplicationLoadBalancer(this, "MyALB", {
      vpc,
      internetFacing: true,
    });

    // Add a listener to the Load Balancer
    const listener = lb.addListener("MyListener", {
      port: 80,
    });

    // Add a rule to the listener to route traffic to the Lambda function
    listener.addTargets("MyTargets", {
      targets: [new elbv2_targets.LambdaTarget(myLambda)],
    });
  }
}
