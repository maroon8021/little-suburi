import {
  Stack,
  StackProps,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_s3 as s3,
  aws_apigateway as apigw,
} from "aws-cdk-lib";
import { Construct } from "constructs";

type CloudFrontProps = {
  api: apigw.LambdaRestApi;
  bucket: s3.Bucket;
} & StackProps;

export class CloudFront extends Stack {
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: CloudFrontProps) {
    super(scope, id, props);

    const { api, bucket } = props;

    // const originAccessIdentity = new cloudfront.OriginAccessIdentity(
    //   this,
    //   `nextSsrOriginAccessIdentity`,
    //   {}
    // )

    // this.bucket.grantRead(originAccessIdentity)
    const apiOrigin = new origins.RestApiOrigin(api);

    this.distribution = new cloudfront.Distribution(
      this,
      "nextSsrDistribution",
      {
        defaultBehavior: {
          origin: apiOrigin,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        additionalBehaviors: {
          "/_next/data/*": {
            origin: apiOrigin,
            allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
            viewerProtocolPolicy:
              cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          },
          "/_next/*": {
            origin: new origins.S3Origin(bucket),
            viewerProtocolPolicy:
              cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          },
        },
      }
    );
  }
}
