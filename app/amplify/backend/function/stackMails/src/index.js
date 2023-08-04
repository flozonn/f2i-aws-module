/* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
// Set the region to match your DynamoDB region
AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event.body)}`);
    console.log('toto:', event.body);


    const requestBody = JSON.parse(event.body);

    const item = {
        TableName: 'messageToSend-dev',
        Item: {
            'id': { S: JSON.stringify(Math.random(500)) },
            'messageContent': { S: requestBody.contenu },
            'destination': { S: requestBody.destinataire },
        },
    };
    await dynamodb.putItem(item).promise();



    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
