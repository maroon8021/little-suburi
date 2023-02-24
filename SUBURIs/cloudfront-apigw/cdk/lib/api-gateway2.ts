import {
  Stack,
  StackProps,
  aws_lambda as lambda,
  aws_apigateway as apigw,
  aws_iam as iam,
} from "aws-cdk-lib";
import { Construct } from "constructs";

type ApiGatewayProps = {
  lambdaFunction: lambda.Function;
} & StackProps;

export class ApiGateway2 extends Stack {
  public readonly api: apigw.LambdaRestApi;
  public readonly apiKey: apigw.IApiKey;
  public readonly apiKeyValue: string;

  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id, props);

    const { lambdaFunction } = props;

    this.api = new apigw.LambdaRestApi(this, "cloudfrontApigw-endpoint2", {
      handler: lambdaFunction,
      restApiName: "cloudfrontApigw2",
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowHeaders: ["content-type", "authorization"],
        allowCredentials: true,
      },
      defaultMethodOptions: {
        apiKeyRequired: true,
      },
      deployOptions: {
        loggingLevel: apigw.MethodLoggingLevel.INFO,
      },
      endpointTypes: [apigw.EndpointType.REGIONAL],
      apiKeySourceType: apigw.ApiKeySourceType.HEADER,
    });

    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    this.apiKeyValue = Array.from(Array(20))
      .map(() => S[Math.floor(Math.random() * S.length)])
      .join("");

    this.apiKey = this.api.addApiKey("cloudfrontApigw-apikey", {
      value: this.apiKeyValue,
    });

    const plan = this.api.addUsagePlan("cloudfrontApigw-userPlan");
    plan.addApiStage({
      stage: this.api.deploymentStage,
    });
    plan.addApiKey(this.apiKey);
  }
}

type ApiGateway2AttachPolicyProps = {
  api: apigw.LambdaRestApi;
  cloudrontArn: string;
} & StackProps;

export class ApiGateway2AttachPolicy extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: ApiGateway2AttachPolicyProps
  ) {
    super(scope, id, props);

    const api = props.api as any;

    const policy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          principals: [new iam.AnyPrincipal()],
          actions: ["execute-api:Invoke"],
          resources: ["execute-api:/*"],
          effect: iam.Effect.ALLOW,
          conditions: {
            StringNotEquals: {
              "aws:SourceArn": props.cloudrontArn,
            },
          },
        }),
        // new iam.PolicyStatement({
        //   principals: [new iam.AnyPrincipal],
        //   actions: ['execute-api:Invoke'],
        //   resources: ['execute-api:/*'],
        //   effect: iam.Effect.ALLOW
        // })
      ],
    });
  }
}
