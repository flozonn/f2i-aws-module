const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    try {
        
        console.log('WRITE_TO_DYNAMO LAMBDA déclenchée ! ----> ', event.Records[0].dynamodb.NewImage);
        const data = event.Records[0].dynamodb.NewImage;
        // Récupérer le corps de la requête
        const requestBody = AWS.DynamoDB.Converter.unmarshall(data);
        console.log('WRITE_TO_DYNAMO requestBody --> ', requestBody);

        // Préparer les paramètres pour l'insertion dans DynamoDB
        const params = {
            TableName: 'content_table', 
            Item: {
                id: requestBody.id, 
                ...requestBody
            }
        };
        console.log('WRITE_TO_DYNAMO params --> ', params);
        
        // Insérer les données dans DynamoDB
        const res = await dynamodb.put(params).promise();
        console.log('res --> ', res);
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