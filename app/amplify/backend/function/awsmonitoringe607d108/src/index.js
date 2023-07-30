/* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    try {
        const regions = ['us-east-1']; // Add more regions as needed
        console.log('regions --> ', regions);
        const resourcesByRegion = {};

        for (const region of regions) {
            resourcesByRegion[region] = {};
            const s3 = new AWS.S3({ region });

            const s3Buckets = await s3.listBuckets().promise();
            console.log('s3Buckets --> ', s3Buckets);
            resourcesByRegion[region].s3Buckets = s3Buckets.Buckets.length;

            // Add more AWS service API calls as needed for other resource types
        }

        return {
            statusCode: 200,
            body: JSON.stringify(resourcesByRegion),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
        };
    } catch (err) {
        console.log('err --> ', err)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
        };
    }
};
