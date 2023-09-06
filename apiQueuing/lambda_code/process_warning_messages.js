const AWS = require('aws-sdk');

exports.handler = async (event) => {


    try {
        for (const record of event.Records) {
            const messageBody = JSON.parse(record.body);
            console.log('Message from SQS:', messageBody);
        }
        return {
            statusCode: 200,
            body: JSON.stringify('Messages processed successfully'),
        };
    } catch (error) {
        console.error('Error processing SQS messages:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error processing SQS messages'),
        };
    }
};
