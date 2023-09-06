const AWS = require('aws-sdk');
const comprehend = new AWS.Comprehend();
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    try {
        for (const record of event.Records) {
            const messageBody = JSON.parse(record.body);
            const phrase = messageBody.MessageAttributes.phrase.Value;
            const params = {
                LanguageCode: 'fr',
                Text: phrase,
            };
            console.log(params);
            const t = await comprehend.detectEntities(params).promise();
            if (t) {
                const entitesNommees = t.Entities;
                console.log('Entités nommées : ', entitesNommees);
                for (const entite of entitesNommees) {
                    //write to dynamodb
                    const params = {
                        TableName: "user_entities",
                        Item: {
                            'id': { S: record.messageId },
                            'type': { S: messageBody.MessageAttributes.type.Value },
                            'phrase': { S: phrase },
                            'entite': { S: entite.Text },
                            'score': { N: entite.Score.toString() },
                        },
                    };
                    console.log('params to dynamo : ', params);
                    const result = await dynamodb.putItem(params).promise();
                    console.log('result : ', result);
                }
            }
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
