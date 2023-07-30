/* src/App.js */
import React, { useEffect, useState } from 'react'
import { Amplify, API } from 'aws-amplify'

import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from "./aws-exports";
Amplify.configure(
  {
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
  }
);


const App = ({ signOut, user }) => {
  const [ressources, setRessources] = useState(null);

  const fetchApiData = async () => {
    try {
      const response = await API.get('apiMonitoring', '/ressources');
      console.log('response AAAA A', response);
      setRessources(response);
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <div style={styles.container}>
      <Heading level={1}>Hello {user.attributes.email}</Heading>
      <Button onClick={signOut} style={styles.button}>Sign out</Button>
      <h2>Amplify App</h2>



      <button onClick={fetchApiData} style={styles.button} >Charger les données de l'API</button>
      {ressources && (
        <div>
          <h2>Résultat de l'appel API :</h2>
          <pre>{JSON.stringify(ressources, null, 2)}</pre>
          <pre>{JSON.stringify(user.attributes.email, null, 2)}</pre>
        </div>
      )}

    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: { marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);