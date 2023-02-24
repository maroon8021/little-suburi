import {
  Stack,
  StackProps,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_s3 as s3,
  aws_apigateway as apigw,
  Duration,
} from "aws-cdk-lib";
import { Construct } from "constructs";

type CloudFrontProps = {
  api: apigw.LambdaRestApi;
  api2: apigw.LambdaRestApi;
  apiKey: string;
} & StackProps;

export class CloudFront extends Stack {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: CloudFrontProps) {
    super(scope, id, props);

    const { api, api2, apiKey } = props;

    const cachePolicy = new cloudfront.CachePolicy(
      this,
      "cloudfrontApigw-CachePolicy",
      {
        cachePolicyName: "cloudfrontApigw-CustomPolicy",
        defaultTtl: Duration.seconds(0),
        headerBehavior: cloudfront.CacheHeaderBehavior.allowList("x-api-key"),
      }
    );

    this.distribution = new cloudfront.Distribution(
      this,
      "nextSsrDistribution",
      {
        defaultBehavior: {
          origin: new origins.RestApiOrigin(api),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        additionalBehaviors: {
          "/no-cache": {
            origin: new origins.RestApiOrigin(api),
            allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
            viewerProtocolPolicy:
              cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          },
          "/secure": {
            origin: new origins.RestApiOrigin(api2, {
              customHeaders: {
                "x-api-key": apiKey,
              },
            }),
            allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
            viewerProtocolPolicy:
              cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            cachePolicy,
          },
        },
      }
    );
  }
}
