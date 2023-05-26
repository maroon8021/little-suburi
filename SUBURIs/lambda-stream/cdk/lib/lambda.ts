import * as cdk from "aws-cdk-lib";
import { aws_lambda as lambda, Duration, aws_logs as logs } from "aws-cdk-lib";
import { Construct } from "constructs";

export class Lambda extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, "stream-lambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      functionName: "stream-lambda",
      code: lambda.Code.fromInline(`

          exports.handler = awslambda.streamifyResponse (
            async (event, responseStream, context) => {
                for (let idx = 1; idx < 11; idx++) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    responseStream.write('streaming response line ' + idx + '\\n');
                }
                responseStream.write("----END Stream----");
                responseStream.end();
            }
        );
        `),
      handler: "index.handler",
      timeout: Duration.seconds(30),
    });

    lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ["*"],
        allowedMethods: [lambda.HttpMethod.ALL],
        allowedHeaders: ["*"],
      },
    });
  }
}
