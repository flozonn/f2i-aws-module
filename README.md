# f2i-aws-module

Bienvenue dans le module AWS cloud computing.  
Ce repo contient les scripts et fichiers associés aux [cours](https://www.notion.so/AWS-cloud-computing-014d4f12a07f407285c1999855c93ffc?pvs=4).

## **scriptsUsingSdk/**
  - 📖 [cours](https://www.notion.so/COURS-Les-diff-rentes-fa-ons-d-interagir-avec-AWS-e0ad210e34f84e7d884183c12db8b972?pvs=4#d94806a9985d4edc98a195ef32527fbb)
  - [listBucketsAndEc2.js](scriptsUsingSdk/listBucketsAndEc2.js) --> utilisation du SDK nodejs pour lister les ressources
  - [listS3.js](scriptsUsingSdk/listS3.js) --> utilisation du SDK nodejs pour lister les ressources

## **apiEC2Version/** 

  - 📖 [cours EC2](https://www.notion.so/COURS-Pr-sentation-de-EC2-ac3ccf4b3ef143a0a1b6037c0dd25fda?pvs=4#881467b3b5f34e42972f17849993a587)
  - 📖 [TUTO EC2](https://www.notion.so/TUTO-Mise-en-place-d-un-serveur-EC2-express-avec-un-endpoint-de-calcul-simple-8fc041a725914c1d93909b4fa8293628?pvs=4#056a025ee4c346f18629122ba1a524f8)
  - [app.js](apiEC2Version/app.js) --> fichier nodeJS, code du server express exposant 2 endpoints bonjour et saveToS3
  - [ec2.tf](apiEC2Version/ec2.tf) --> Terraform définition de l'infra : gateway, groupe de sécurité et instance ec2
  - [init-script.sh](apiEC2Version/init-script.sh) --> Script bash d'initialisation du serveur EC2 

## **apiLambdaVersion/**
  - 📖 [cours terraform](https://www.notion.so/COURS-Concepts-cl-s-de-terraform-ec84aaf8f0e54acab4a343091375122d?pvs=4#905f96bff82343128451d031f2533f3b)
  - [provider.tf](apiLambdaVersion/provider.tf) --> Définition du provider = AWS
  - [apiGateway.tf](apiLambdaVersion/apiGateway.tf) --> Définition de l'API gateway servant 3 endpoints
  - [database.tf](apiLambdaVersion/database.tf) --> Définition de la base de données nécéssaire à l'API 
  - [databaseiamRoleAndPermissions.tf](apiLambdaVersion/iamRoleAndPermissions.tf) --> Association des permissions 
  - [lambdaBonjour.tf](apiLambdaVersion/lambdaBonjour.tf) --> Définition de la lambda contenant la logique du endpoint /bonjour
  - [lambdaWriteDynamo.tf](apiLambdaVersion/lambdaWriteDynamo.tf) --> Définition de la lambda contenant la logique du endpoint /writeToDynamo
  - [lambdaWriteS3.tf](apiLambdaVersion/lambdaWriteS3.tf) --> Définition de la lambda contenant la logique du endpoint /writeToS3
  - [s3Bucket.tf](apiLambdaVersion/s3Bucket.tf) --> Définition du bucket S3 nécéssaire au stockage des données utilisateurs
  - [lambda_code/](apiLambdaVersion/lambda_code/) --> Fichiers NODEJS exécutés lors de l'appel aux 3 endpoints de l'API

## **app/**
  - 📖 [cours AMPLIFY](https://www.notion.so/COURS-TUTO-Amplify-CI-CD-69bbd1924cef4939b05c551f508c8174?pvs=4#ccf7000583194c119ed41fd00e712b96)
  - 👨🏼‍🏫 [TP application fullstack](https://www.notion.so/TP-2-Application-FullStack-812fd5fbc9ee48c3a877cd345154fcec?pvs=4#a77807dfc0ce4090ae2b028d65f726a4)
  - [amplify](app/amplify) --> Répertoire mis à jour généré via les commandes amplify XXX
  - [src/](app/src/) --> Réperoire contenant l'application REACT
  - [package.json](app/package.json) --> Fichier de définition des dépendances du projet

## **jobService/**
![image](https://github.com/flozonn/f2i-aws-module/assets/74357383/ac1b412a-0178-433e-b841-d6db95790a96)

  - 📖 [cours AMPLIFY](https://www.notion.so/COURS-TUTO-Amplify-CI-CD-69bbd1924cef4939b05c551f508c8174?pvs=4#ccf7000583194c119ed41fd00e712b96)
  - 👨🏼‍🏫 [TP archi event-driven](https://www.notion.so/TP-1-Architecture-v-nementielle-ef11ea81e6764ed484e7c8e695daa382?pvs=4#c50e9598a1d54574a5012b96e7ab2d91)
  - [lambda_code/](jobService/lambda_code) --> Fichiers NODEJS exécutés lors de l'appel aux 3 endpoints de l'API
  - [apiGateway.tf](jobService/apiGateway.tf) --> Définition de l'API gateway servant 3 endpoints
  - [db.tf](jobService/db.tf) --> Définition de la base de données nécéssaire à l'API 
  - [iamPermissions.tf](jobService/iamPermissions.tf) --> Association des permissions 
  - [lambda_add_job.tf](jobService/lambda_add_job.tf) --> Définition de la lambda contenant la logique du endpoint /addJob
  - [lambda_write_to_dynamo.tf](jobService/lambda_write_to_dynamo.tf) --> Définition de la lambda contenant la logique d'écriture dans Dynamo
  - [lambda_write_to_s3.tf](jobService/lambda_write_to_s3.tf) --> Définition de la lambda contenant la logique d'écriture dans S3
  - [s3.tf](jobService/s3.tf) --> Définition du bucket S3 nécéssaire au stockage des données utilisateurs
  - [provider.tf](jobService/provider.tf) --> Définition du provider = AWS

