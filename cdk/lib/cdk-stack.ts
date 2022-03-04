import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from "path";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as logs from "aws-cdk-lib/aws-logs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as api from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";

export class RemixStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, "RequestHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "handler",
      entry: join(__dirname, "../../server/index.js"),
      environment: {
        NODE_ENV: "production",
      },
      bundling: {
        nodeModules: [
		      "@remix-run/architect",
		      "@remix-run/node",
		      "@remix-run/server-runtime",
	       	"@remix-run/react",
		      "react",
		      "react-dom"
        ],
      },
      timeout: cdk.Duration.seconds(10),
      logRetention: logs.RetentionDays.THREE_DAYS,
      tracing: lambda.Tracing.ACTIVE,
    });

    const integration = new HttpLambdaIntegration("RequestHandlerIntegration", fn, {
      payloadFormatVersion: api.PayloadFormatVersion.VERSION_2_0,
    });

    const httpApi = new api.HttpApi(this, "WebsiteApi", {
      defaultIntegration: integration,
    });

    const httpApiUrl = `${httpApi.httpApiId}.execute-api.${cdk.Stack.of(this).region}.${cdk.Stack.of(this).urlSuffix}`;

    new cdk.CfnOutput(this, 'apiUrl', {value: httpApiUrl});
  }
}
