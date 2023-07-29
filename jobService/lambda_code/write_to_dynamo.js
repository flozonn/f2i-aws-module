const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    try {
        
        const data = event.Records[0].dynamodb.NewImage;
        const requestBody = AWS.DynamoDB.Converter.unmarshall(data);
        console.log('Lambda WRITE_TO_DYNAMO déclenchée par la création du nouveau record -> ',requestBody);

        if (requestBody.jobType !== 'addToDynamo') {
            console.log('jobType is not addToDynamo: exiting');
            return {
                statusCode: 200,
                body: JSON.stringify('jobType is not addToDynamo: exiting'),
            };
        }
        // Préparer les paramètres pour l'insertion dans DynamoDB
        const params = {
            TableName: 'content_table', 
            Item: {
                id: requestBody.id, 
                ...requestBody
            }
        };
        
        // Insérer les données dans DynamoDB
        const res = await dynamodb.put(params).promise();
        console.log('dynamoDb put request triggered --> ', res);
        const response = {
            statusCode: 200,
            body: JSON.stringify('element inserted in dynamoDB'),
        };
        return response;

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
    
};