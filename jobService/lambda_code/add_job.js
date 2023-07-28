const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    try {
        
        console.log('LAMBDA déclenchée !');
    
        // Récupérer le corps de la requête
        const requestBody = JSON.parse(event.body);
        console.log('requestBody --> ', requestBody);

        // Préparer les paramètres pour l'insertion dans DynamoDB
        const params = {
            TableName: 'job_table', 
            Item: {
                id: requestBody.id, 
                ...requestBody
            }
        };
        console.log('params --> ', params);
        
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