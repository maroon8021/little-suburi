import { Stack, StackProps, aws_s3 as s3, aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";

type S3Props = {
  bucketName: string;
} & StackProps;

export class S3 extends Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: S3Props) {
    super(scope, id, props);

    const { bucketName } = props;

    this.bucket = new s3.Bucket(this, `viteReactStaticBucket`, {
      bucketName,
    });
  }
}
