const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'eu-west-3' // france
  });

  const s3 = new AWS.S3();

  function listS3Buckets() {
    s3.listBuckets((err, data) => {
      if (err) {
        console.error('Erreur lors de la récupération de la liste des seaux S3 :', err);
      } else {
        console.log('bucket S3 :');
        data.Buckets.forEach(bucket => {
          console.log(bucket.Name);
        });
      }
    });
  }

  // Appel de la fonction pour lister les seaux S3
listS3Buckets();