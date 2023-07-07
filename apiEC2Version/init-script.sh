#!/bin/bash
cd /home/ec2-user
sudo yum update -y
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs
sudo npm install express
nohup node /home/ec2-user/app.js &