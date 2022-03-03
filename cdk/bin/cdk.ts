#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RemixStack } from '../lib/cdk-stack';

const env: cdk.Environment = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION
};

const app = new cdk.App();
new RemixStack(app, 'RemixStack', { env });