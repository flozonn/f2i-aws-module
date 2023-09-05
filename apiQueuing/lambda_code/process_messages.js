const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const sqs = new AWS.SQS({ region: 'votre-region-AWS' });  // Remplacez par votre région AWS
    const queueUrl = process.env.SQS_QUEUE_URL;

    try {
        // Traitement des messages de la file d'attente
        for (const record of event.Records) {
            const messageBody = JSON.parse(record.body);

            // Faites quelque chose avec le message (par exemple, imprimez-le)
            console.log('Message from SQS:', messageBody);

            // Vous pouvez ajouter ici le code pour effectuer d'autres opérations
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
