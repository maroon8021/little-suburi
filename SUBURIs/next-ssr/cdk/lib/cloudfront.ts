import {
  Stack,
  StackProps,
  Duration,
  aws_cloudfront as cloudfront,
  aws_s3 as s3,
  aws_route53 as route53,
  aws_route53_targets as route53Targets,
  aws_iam as iam,
} from "aws-cdk-lib";
import { Construct } from "constructs";

type CloudFrontProps = {
  hostedZone: route53.IHostedZone;
} & StackProps;

export class CloudFront extends Stack {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: CloudFrontProps) {
    super(scope, id, props);

    const { hostedZone } = props;

    this.bucket = new s3.Bucket(this, `nextSsrCloudFrontBucket`, {
      bucketName: `next-ssr-static-321`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      `nextSsrOriginAccessIdentity`,
      {}
    );

    this.bucket.grantRead(originAccessIdentity);

    this.distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      `nextSsrDistribution`,
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: this.bucket,
              originAccessIdentity,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                minTtl: Duration.seconds(0),
                maxTtl: Duration.days(365),
                defaultTtl: Duration.days(1),
              },
            ],
          },
        ],
        errorConfigurations: [
          {
            responseCode: 200,
            responsePagePath: "/index.html",
            errorCachingMinTtl: 0,
            errorCode: 403,
          },
          {
            responseCode: 200,
            responsePagePath: "/index.html",
            errorCachingMinTtl: 0,
            errorCode: 404,
          },
        ],
        // ここがないと、ドメイン貼ったときに403とかになる可能性がある
        viewerCertificate: {
          aliases: [donainName],
          props: {
            acmCertificateArn: certificateArnOnGlobal,
            sslSupportMethod: cloudfront.SSLMethod.SNI,
          },
        },
      }
    );

    new route53.ARecord(this, `yattaneCloudFrontPublicRecord`, {
      zone: hostedZone,
      recordName: donainName,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(this.distribution)
      ),
    });
  }
}

type AssetProps = {
  hostedZone: route53.IHostedZone;
  user: iam.User;
  role: iam.Role;
} & StackProps;

export class Asset extends Stack {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: AssetProps) {
    super(scope, id, props);

    const { hostedZone, user, role } = props;

    this.bucket = new s3.Bucket(this, `yattaneAssetBucket`, {
      bucketName: `yattane-asset`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    this.bucket.grantReadWrite(user);
    this.bucket.grantReadWrite(role);

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      `yattaneAssetOriginAccessIdentity`,
      {}
    );

    this.bucket.grantRead(originAccessIdentity);

    this.distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      `yattaneAssetDistribution`,
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: this.bucket,
              originAccessIdentity,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                minTtl: Duration.seconds(0),
                maxTtl: Duration.days(365),
                defaultTtl: Duration.days(10),
              },
            ],
          },
        ],
        viewerCertificate: {
          aliases: [`asset-${donainName}`],
          props: {
            acmCertificateArn: certificateArnOnGlobal,
            sslSupportMethod: cloudfront.SSLMethod.SNI,
          },
        },
      }
    );

    new route53.ARecord(this, `yattaneAssetPublicRecord`, {
      zone: hostedZone,
      recordName: `asset-${donainName}`,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(this.distribution)
      ),
    });
  }
}
