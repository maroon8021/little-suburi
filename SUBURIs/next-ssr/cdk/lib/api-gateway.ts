import {
  Stack,
  StackProps,
  aws_lambda as lambda,
  aws_apigateway as apigw,
} from "aws-cdk-lib";
import { Construct } from "constructs";

type ApiGatewayProps = {
  lambdaFunction: lambda.Function;
} & StackProps;

export class ApiGateway extends Stack {
  public readonly apigwDomain: apigw.DomainName;
  public readonly domainName: string;
  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id, props);

    const { lambdaFunction } = props;

    const api = new apigw.LambdaRestApi(this, "next-ssr-endpoint", {
      handler: lambdaFunction,
      //proxy: false,
      restApiName: "next-ssr",
      defaultCorsPreflightOptions: {
        allowOrigins: ["*"],
        allowHeaders: ["content-type", "authorization"],
        allowCredentials: true,
      },
      endpointTypes: [apigw.EndpointType.REGIONAL],
    });
  }
}
