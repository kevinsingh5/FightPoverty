#!/bin/bash

#Get servers list
set -f
server=$DEPLOY_SERVER
array=(${server//,/ })

#Iterate servers for deployment
for i in "${!array[@]}"; do    
     echo "Deploying project on server ${array[i]}"
     echo "Current files:"
     ls -al
     echo "Copying front-end files..."
     scp -v -r frontend/ ubuntu@${array[i]}:FightingPoverty/
     echo "Connecting to EC2 host..."
     ssh ubuntu@${array[i]} "pwd && cd FightingPoverty/frontend/react-app/ && docker ps && docker stop reactapp && docker rm reactapp && echo Removed Docker container! && docker build -t react . && docker run -p 3000:3000 -d --name reactapp -t react && docker ps"
     echo "Successfully deployed React app on EC2 Docker container"
done