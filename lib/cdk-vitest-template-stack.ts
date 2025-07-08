import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import path = require('path');

export class CdkVitestTemplateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const myFunction = new NodejsFunction(this, "HelloWorldFunction", {
      entry: path.join(__dirname, "../src/lambda/index.ts"),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_16_X,
    });

    const api = new apigateway.RestApi(this, 'HelloWorldApi', {
      restApiName: 'Hello World Service',
      description: 'This service serves hello world.',
    });

    const helloIntegration = new apigateway.LambdaIntegration(myFunction);
    const helloResource = api.root.addResource('hello');
    helloResource.addMethod('GET', helloIntegration);
  }

}
