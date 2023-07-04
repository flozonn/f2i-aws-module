/*
relatif au cours :
https://www.notion.so/Les-diff-rentes-fa-ons-d-interagir-avec-AWS-e0ad210e34f84e7d884183c12db8b972?pvs=4
*/
const AWS = require('aws-sdk');

// Configurez les informations d'identification AWS
AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'f2i' });
AWS.config.update({ region: 'eu-west-3' });

// Créez un client pour le service S3
const s3 = new AWS.S3();
const ec2 = new AWS.EC2();
// Fonction pour lister les buckets S3
function listS3Buckets() {
  s3.listBuckets((err, data) => {
    if (err) {
      console.error('Erreur lors de la récupération de la liste des buckets S3 :', err);
    } else {
      console.log('buckets S3 :');
      data.Buckets.forEach(bucket => {
        console.log(bucket.Name);
      });
    }
  });
}
// Fonction pour répertorier les instances EC2
function listerInstancesEC2() {
    const params = {};
  
    // Appeler l'API DescribeInstances pour récupérer les informations sur les instances EC2
    ec2.describeInstances(params, function(err, data) {
      if (err) {
        console.log("Erreur lors de la récupération des instances EC2 :", err);
      } else {
        // Parcourir les réservations pour obtenir les informations sur les instances
        console.log('EC2 instances :');
        data.Reservations.forEach(function(reservation) {
          reservation.Instances.forEach(function(instance) {
            console.log("ID de l'instance :", instance.InstanceId);
            console.log("Type d'instance :", instance.InstanceType);
            console.log("État de l'instance :", instance.State.Name);
            console.log("IP publique :", instance.PublicIpAddress);
            console.log("------------------------");
          });
        });
      }
    });
  }
  

// Appel de la fonction pour lister les seaux S3
listS3Buckets();
// Appeler la fonction pour répertorier les instances EC2
listerInstancesEC2();
