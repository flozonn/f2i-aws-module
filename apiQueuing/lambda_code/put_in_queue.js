const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk')) 
const sns = new AWS.SNS();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    console.log('LAMBDA declenchée ! ');
    const params = {
        Message: 'Message to put in queue',
        TopicArn: process.env.SNS_TOPIC_ARN,
        MessageAttributes: {
            'type'  : {
                DataType: 'String',
                StringValue: body.type
            },
            'phrase': {
                DataType: 'String',
                StringValue: body.phrase
            }
        }
    };
    try {
        const result = await sns.publish(params).promise();
        console.log("Message published to SNS:", result.MessageId);
        return {
            statusCode: 200,
            body: JSON.stringify('Message published to SNS!')
        };
    } catch (error) {
        console.error("Error publishing message to SNS:", error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error publishing message to SNS!')
        };
    }
};
