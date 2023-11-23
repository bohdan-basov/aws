import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export type LambdaOptions = {
  name: string;
};

export function lambdaHandler(_options: LambdaOptions) {
  return (cb: APIGatewayProxyHandlerV2) => {
    return cb;
  };
}
export type DynamoDbOptions = {
  name: string;
  partitionKey: {
    name: string;
    type: 'BINARY' | 'NUMBER' | 'STRING';
  };
};

export function dynamoDbTable(options: DynamoDbOptions) {
  return {
    tableName: options.name,
    async query(_options: unknown) {
      return { items: [{ PK: '1' }] };
    },
  };
}

export type S3BucketOptions = {
  name: string;
};

export function s3Bucket(_options: S3BucketOptions) {
  return {
    bucketName: 'test',
  };
}
