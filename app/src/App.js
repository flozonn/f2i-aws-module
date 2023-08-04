import React, { useEffect, useState } from 'react';
import { Amplify, API, Storage, Analytics } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Button, Typography, IconButton, Grid, Paper, AppBar, Toolbar } from '@mui/material';
import awsExports from "./aws-exports";
import { Delete as DeleteIcon } from '@mui/icons-material'; // Import de l'icône DeleteIcon


Analytics.autoTrack('session', {
  // REQUIRED, turn on/off the auto tracking
  enable: true,
  // OPTIONAL, the attributes of the event, you can either pass an object or a function 
  // which allows you to define dynamic attributes
  attributes: {
    attr: 'attr'
  },

  provider: 'AWSPinpoint'
});

Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: "apiMonitoring",
        endpoint: "https://cm1o5mrycb.execute-api.us-east-1.amazonaws.com/dev",
        region: "us-east-1",
      },
    ],
  },

});

const styles = {
  container: {
    padding: '2vw',
  },
  button: {
    backgroundColor: 'black',
    color: '#FF1493',
    outline: 'none',
    fontSize: '18px',
    padding: '12px 24px',
    margin: '16px',
  },
  buttonInverted: {
    backgroundColor: 'pink',
    color: 'black',
    outline: 'none',
    fontSize: '18px',
    padding: '12px 24px',
    margin: '16px',
  },
  fileInput: {
    display: 'none',
  },
  paper: {
    padding: '16px',
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    marginRight: '16px',
    color: '#FF1493',
  },
  grow: {
    flexGrow: 1,
  },
  pinkAppBar: {
    color: 'white',
    backgroundColor: 'pink', // Ici vous pouvez changer la couleur de l'arrière-plan
  },
  deleteIcon: {
    color: '#FF1493',
  }
};

const App = ({ signOut, user }) => {
  const [ressources, setRessources] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [s3files, setS3files] = useState(null);

  const [destinataire, setDestinataire] = useState('');
  const [contenuMail, setContenuMail] = useState('');

  const handleDelete = async (filename) => {
    try {
      await Storage.remove(filename, { level: 'private' });
      alert('Le fichier a été supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression du fichier:', error);
      alert('Une erreur s\'est produite lors de la suppression du fichier.');
    }
  };

  const handleSubmitEmail = async (event) => {
    event.preventDefault();

    // Vérifier si les champs sont vides
    if (!destinataire || !contenuMail) {
      alert('Veuillez remplir tous les champs avant de soumettre le formulaire.');
      return;
    }

    try {
      // Données à envoyer dans la requête POST
      const dataToSend = {
        destinataire: destinataire,
        contenu: contenuMail,
      };

      // Effectuer la requête API POST
      const response = await API.post('apiMonitoring', '/sendMail', {
        body: dataToSend,
      });

      // Traiter la réponse de l'API si nécessaire
      console.log('Réponse de l\'API:', response);
      alert('Mail envoyé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la requête API:', error);
      alert('Une erreur s\'est produite lors de l\'envoi du mail.');
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Veuillez sélectionner un fichier avant de continuer.');
      return;
    }

    setUploading(true);

    try {
      const filename = selectedFile.name;
      await Storage.put(filename, selectedFile, { level: 'private' });
      alert('Le fichier a été téléchargé avec succès sur Amazon S3.');
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
      alert('Une erreur s\'est produite lors du téléchargement du fichier.');
    } finally {
      setUploading(false);
    }
  };

  const fetchApiData = async () => {
    try {
      const response = await API.get('apiMonitoring', '/ressources');
      setRessources(response);
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  const fetchUserFiles = async () => {
    try {
      const userFiles = await Storage.list('', { level: 'private' });
      console.log(userFiles);
      setS3files(userFiles);
    } catch (error) {
      console.error('Error fetching USER files:', error);
    }
  };



  useEffect(() => {
    fetchApiData();
    fetchUserFiles();

  }, []);

  return (
    <div>
      <AppBar position="static" style={styles.pinkAppBar}>
        <Toolbar>
          <Typography variant="h6" style={styles.username}>
            {user.attributes.email}
          </Typography>
          <div style={styles.grow} />
          <Button color="inherit" onClick={signOut} >Sign out</Button>
        </Toolbar>
      </AppBar>


      <Grid container alignItems="top" spacing={2} padding={10}>
        <Grid item xs={6}>
          <Button onClick={fetchApiData} style={styles.button}>Appeler l'api</Button>
          {ressources && (
            <Paper elevation={3} style={styles.paper}>
              <Typography variant="h5">Résultat de l'appel API</Typography>
              <pre>{JSON.stringify(ressources, null, 2)}</pre>
            </Paper>
          )}
        </Grid>

        <Grid item container xs={6}>
          <Grid item xs={12} >
            <input type="file" onChange={handleFileChange} style={styles.fileInput} id="fileInput" />
            <label htmlFor="fileInput">
              <Button variant="contained" component="span" style={styles.button}>
                Choisir un fichier
              </Button>
              <Button variant="primary" onClick={handleUpload} disabled={uploading} style={styles.buttonInverted} >
                {uploading ? <Typography>Téléchargement en cours...</Typography> : "Télécharger"}
              </Button>
            </label>
            {s3files && (
              s3files?.results?.map((file) => (
                <Paper elevation={3} style={styles.paper}>

                  <Typography key={file.key}>{file.key}</Typography>
                  <IconButton
                    color="secondary"
                    aria-label="Supprimer"
                    style={styles.deleteIcon}
                    onClick={() => handleDelete(file.key)} // Mettez ici la fonction pour supprimer le fichier
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>

              ))
            )}
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmitEmail}>
              <label htmlFor="destinataire">Destinataire (email) :</label>
              <input
                type="email"
                id="destinataire"
                value={destinataire}
                onChange={(e) => setDestinataire(e.target.value)}
                required
              />
              <br />

              <label htmlFor="contenu">Contenu du mail :</label>
              <textarea
                id="contenu"
                value={contenuMail}
                onChange={(e) => setContenuMail(e.target.value)}
                required
              />
              <br />

              <input type="submit" value="Envoyer" style={styles.button} />
            </form>
          </Grid>

        </Grid>

      </Grid>
    </div>
  );
};

export default withAuthenticator(App);
