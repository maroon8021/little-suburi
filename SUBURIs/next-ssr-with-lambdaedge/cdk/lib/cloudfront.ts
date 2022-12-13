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
  edgeFunction: cloudfront.experimental.EdgeFunction;
} & StackProps;

export class CloudFront extends Stack {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: CloudFrontProps) {
    super(scope, id, props);

    const { edgeFunction } = props;

    this.bucket = new s3.Bucket(this, `nextSsrWithLambdaEdgeCloudFrontBucket`, {
      bucketName: `next-ssr-with-lambdaedge-static-321`,
    });

    this.distribution = new cloudfront.Distribution(
      this,
      "nextSsrWithLambdaEdgeDistribution",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(this.bucket),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          edgeLambdas: [
            {
              functionVersion: edgeFunction.currentVersion,
              eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
              includeBody: true,
            },
          ],
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
