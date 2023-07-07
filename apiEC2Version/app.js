const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());  

app.get('/', (req, res) => {

  if (validateToken(req.headers.authorization)) {
    res.send('Bonjour');
  } else {
    res.status(401).send('Unauthorized');
  }

});

app.post('/savetos3', (req, res) => {
  const body =  req.body;
  console.log(body);
  const params = {
    Bucket: 'votre_bucket', // pass your bucket name
    Key: 'nom_du_fichier', // file will be saved as votre_bucket/nom_du_fichier
    Body: JSON.stringify(body, null, 2)
};
s3.upload(params, function(s3Err, data) {
    if (s3Err) throw s3Err
    res.send('saved to s3' + JSON.stringify(body));
    
});

});

app.listen(3000, () => {
  console.log('Le serveur est en écoute sur le port 3000');
});