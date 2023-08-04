const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const ses = new AWS.SES();

/**
 * @type {import('@types/aws-lambda').DynamoDBStreamHandler}
 */


async function verifyEmailAddress(emailAddress) {
  try {
    const params = {
      EmailAddress: emailAddress,
    };

    await ses.verifyEmailAddress(params).promise();
    console.log(`Successfully verified email address: ${emailAddress}`);
  } catch (error) {
    console.error(`Error verifying email address ! ${emailAddress}:`, error);
  }
}


exports.handler = async (event, context) => {
  console.log(JSON.stringify(event, null, 2));

  try {
    for (const record of event.Records) {
      if (record.eventName === "INSERT") {
        const destination = record.dynamodb.NewImage.destination.S;
        const messageContent = record.dynamodb.NewImage.messageContent.S;
        //verifyEmailAddress('florian.breton1@icloud.com');
        // Create the email parameters
        const params = {
          Destination: {
            ToAddresses: [destination],
          },
          Message: {
            Body: {
              Text: { Data: messageContent },
            },
            Subject: { Data: "Sent from my platform" },
          },
          Source: "florian.breton11@gmail.com",
        };

        // Send the email using SES
        await ses.sendEmail(params).promise();
        console.log(`Email sent to ${destination}`);
      }
    }

    context.done(null, 'Successfully processed DynamoDB record');
  } catch (error) {
    console.error('Error sending email:', error);
    context.done(error, 'Error processing DynamoDB record');
  }
};
