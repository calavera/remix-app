"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemixStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const path_1 = require("path");
const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const logs = require("aws-cdk-lib/aws-logs");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const api = require("@aws-cdk/aws-apigatewayv2-alpha");
const aws_apigatewayv2_integrations_alpha_1 = require("@aws-cdk/aws-apigatewayv2-integrations-alpha"); // import * as sqs from 'aws-cdk-lib/aws-sqs';
class RemixStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const fn = new aws_lambda_nodejs_1.NodejsFunction(this, "RequestHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: "handler",
            entry: path_1.join(__dirname, "../../netlify/functions/server/index.js"),
            environment: {
                NODE_ENV: "production",
            },
            bundling: {
                nodeModules: [
                    "@remix-run/netlify",
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
        const integration = new aws_apigatewayv2_integrations_alpha_1.HttpLambdaIntegration("RequestHandlerIntegration", fn, {
            payloadFormatVersion: api.PayloadFormatVersion.VERSION_2_0,
        });
        const httpApi = new api.HttpApi(this, "WebsiteApi", {
            defaultIntegration: integration,
        });
        const httpApiUrl = `${httpApi.httpApiId}.execute-api.${cdk.Stack.of(this).region}.${cdk.Stack.of(this).urlSuffix}`;
        console.log(`HTTP API AT: ${httpApiUrl}`);
    }
}
exports.RemixStack = RemixStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFnRDtBQUVoRCwrQkFBNEI7QUFDNUIsbUNBQW1DO0FBQ25DLGlEQUFpRDtBQUNqRCw2Q0FBNkM7QUFDN0MscUVBQStEO0FBQy9ELHVEQUF1RDtBQUN2RCxzR0FBcUYsQ0FBQSw4Q0FBOEM7QUFFbkksTUFBYSxVQUFXLFNBQVEsbUJBQUs7SUFDbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEVBQUUsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3BELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLFdBQUksQ0FBQyxTQUFTLEVBQUUseUNBQXlDLENBQUM7WUFDakUsV0FBVyxFQUFFO2dCQUNYLFFBQVEsRUFBRSxZQUFZO2FBQ3ZCO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLFdBQVcsRUFBRTtvQkFDbkIsb0JBQW9CO29CQUNwQixpQkFBaUI7b0JBQ2pCLDJCQUEyQjtvQkFDcEIsa0JBQWtCO29CQUN6QixPQUFPO29CQUNQLFdBQVc7aUJBQ1g7YUFDSztZQUNELE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVTtZQUMzQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1NBQy9CLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLElBQUksMkRBQXFCLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxFQUFFO1lBQzdFLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXO1NBQzNELENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ2xELGtCQUFrQixFQUFFLFdBQVc7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRW5ILE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNGO0FBdENELGdDQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgbG9ncyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxvZ3NcIjtcbmltcG9ydCB7IE5vZGVqc0Z1bmN0aW9uIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzXCI7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSBcIkBhd3MtY2RrL2F3cy1hcGlnYXRld2F5djItYWxwaGFcIjtcbmltcG9ydCB7IEh0dHBMYW1iZGFJbnRlZ3JhdGlvbiB9IGZyb20gXCJAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheXYyLWludGVncmF0aW9ucy1hbHBoYVwiOy8vIGltcG9ydCAqIGFzIHNxcyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcblxuZXhwb3J0IGNsYXNzIFJlbWl4U3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgZm4gPSBuZXcgTm9kZWpzRnVuY3Rpb24odGhpcywgXCJSZXF1ZXN0SGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGhhbmRsZXI6IFwiaGFuZGxlclwiLFxuICAgICAgZW50cnk6IGpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL25ldGxpZnkvZnVuY3Rpb25zL3NlcnZlci9pbmRleC5qc1wiKSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIE5PREVfRU5WOiBcInByb2R1Y3Rpb25cIixcbiAgICAgIH0sXG4gICAgICBidW5kbGluZzoge1xuICAgICAgICBub2RlTW9kdWxlczogW1xuXHRcdFwiQHJlbWl4LXJ1bi9uZXRsaWZ5XCIsXG5cdFx0XCJAcmVtaXgtcnVuL25vZGVcIixcblx0XHRcIkByZW1peC1ydW4vc2VydmVyLXJ1bnRpbWVcIixcblx0ICAgICAgIFx0XCJAcmVtaXgtcnVuL3JlYWN0XCIsXG5cdFx0XCJyZWFjdFwiLFxuXHRcdFwicmVhY3QtZG9tXCJcblx0XSxcbiAgICAgIH0sXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMCksXG4gICAgICBsb2dSZXRlbnRpb246IGxvZ3MuUmV0ZW50aW9uRGF5cy5USFJFRV9EQVlTLFxuICAgICAgdHJhY2luZzogbGFtYmRhLlRyYWNpbmcuQUNUSVZFLFxuICAgIH0pO1xuXG4gICAgY29uc3QgaW50ZWdyYXRpb24gPSBuZXcgSHR0cExhbWJkYUludGVncmF0aW9uKFwiUmVxdWVzdEhhbmRsZXJJbnRlZ3JhdGlvblwiLCBmbiwge1xuICAgICAgcGF5bG9hZEZvcm1hdFZlcnNpb246IGFwaS5QYXlsb2FkRm9ybWF0VmVyc2lvbi5WRVJTSU9OXzJfMCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGh0dHBBcGkgPSBuZXcgYXBpLkh0dHBBcGkodGhpcywgXCJXZWJzaXRlQXBpXCIsIHtcbiAgICAgIGRlZmF1bHRJbnRlZ3JhdGlvbjogaW50ZWdyYXRpb24sXG4gICAgfSk7XG5cbiAgICBjb25zdCBodHRwQXBpVXJsID0gYCR7aHR0cEFwaS5odHRwQXBpSWR9LmV4ZWN1dGUtYXBpLiR7Y2RrLlN0YWNrLm9mKHRoaXMpLnJlZ2lvbn0uJHtjZGsuU3RhY2sub2YodGhpcykudXJsU3VmZml4fWA7XG5cbiAgICBjb25zb2xlLmxvZyhgSFRUUCBBUEkgQVQ6ICR7aHR0cEFwaVVybH1gKTtcbiAgfVxufVxuIl19