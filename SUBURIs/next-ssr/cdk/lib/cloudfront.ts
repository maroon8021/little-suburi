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
} & StackProps;

export class CloudFront extends Stack {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: CloudFrontProps) {
    super(scope, id, props);

    const { api } = props;

    this.bucket = new s3.Bucket(this, `nextSsrCloudFrontBucket`, {
      bucketName: `next-ssr-static-321`,
    });

    // const originAccessIdentity = new cloudfront.OriginAccessIdentity(
    //   this,
    //   `nextSsrOriginAccessIdentity`,
    //   {}
    // )

    // this.bucket.grantRead(originAccessIdentity)

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
          "/_next/*": {
            origin: new origins.S3Origin(this.bucket),
            viewerProtocolPolicy:
              cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          },
        },
      }
    );
  }
}
