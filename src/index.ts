import { App, Stack } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { toPascalCase } from './utils';
import { Template } from 'aws-cdk-lib/assertions';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { IGrantable } from 'aws-cdk-lib/aws-iam';

export type Context = {
  code: string;
};

export type Resource = {
  name: string;
};

export type LambdaOptions = {
  name?: string;
};

/* @internal */
export class __LambdaFunction {
  static readonly name = 'lambdaFunction';

  constructor(private _options: unknown) {}

  public inflight() {
    return {
      handler(implementation: APIGatewayProxyHandlerV2) {
        return implementation;
      },
    };
  }

  public preflight(stack: Stack, context: Context) {
    return new Function(
      stack,
      toPascalCase(this.options.name || 'LambdaFunction'),
      {
        runtime: Runtime.NODEJS_18_X,
        handler: 'index.handler',
        code: Code.fromInline(context.code),
      },
    );
  }

  private get options(): LambdaOptions {
    // TODO: validate options
    return this._options as LambdaOptions;
  }
}

export function lambdaFunction(_options: LambdaOptions) {
  return new __LambdaFunction(_options).inflight();
}

export type S3BucketOptions = {
  name?: string;
};

export class __S3Bucket {
  static readonly name = 's3Bucket';

  constructor(private _options: unknown) {}

  public inflight() {
    return {
      grantRead(_grantee: unknown) {},
    };
  }

  public preflight(stack: Stack) {
    return new Bucket(stack, toPascalCase(this.options.name || 'S3Bucket'), {});
  }

  private get options(): S3BucketOptions {
    return this._options as S3BucketOptions;
  }
}

export function s3Bucket(_options: S3BucketOptions) {
  return new __S3Bucket(_options).inflight();
}

export { Stack, App, Template };
export type { IGrantable };
