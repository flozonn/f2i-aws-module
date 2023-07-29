const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {

    try {

        const data = event.Records[0].dynamodb.NewImage;
        const requestBody = AWS.DynamoDB.Converter.unmarshall(data);
        console.log('Lambda WRITE_TO_S3 déclenchée par la création du nouveau record -> ', requestBody);

        if (requestBody.jobType !== 'addToS3') {
            console.log('jobType is not addToS3: exiting');
            return {
                statusCode: 200,
                body: JSON.stringify('jobType is not addToS3: exiting'),
            };
        }
        // Préparer les paramètres pour l'insertion dans S3
        const objectToWrite = {
            Bucket: "contentbucket546541320",
            Key: requestBody.fileName,
            Body: requestBody.content,
        };
        console.log('objectToWrite --> ', objectToWrite);
        const response = await s3.upload(objectToWrite).promise();
        console.log('s3 put request triggered --> ', response);
        const apiResponse = {
            statusCode: 200,
            body: JSON.stringify('Successfull S3 written'),
        };
        return apiResponse;

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }

};