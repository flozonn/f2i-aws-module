export type AmplifyDependentResourcesAttributes = {
  "analytics": {
    "awsmonitoring": {
      "Id": "string",
      "Region": "string",
      "appName": "string"
    }
  },
  "api": {
    "apiMonitoring": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "auth": {
    "awsmonitoring96fe4512": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "awsmonitoringe607d108": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "messageToSendTrigger1152909e": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "stackMails": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "interactions": {
    "appchat": {
      "BotName": "string",
      "FunctionArn": "string",
      "Region": "string"
    }
  },
  "storage": {
    "appUserStorage": {
      "BucketName": "string",
      "Region": "string"
    },
    "messageToSend": {
      "Arn": "string",
      "Name": "string",
      "PartitionKeyName": "string",
      "PartitionKeyType": "string",
      "Region": "string",
      "StreamArn": "string"
    }
  }
}