#!/bin/bash

#Get servers list
set -f
server=$DEPLOY_SERVER
array=(${server//,/ })

#Iterate servers for deployment
for i in "${!array[@]}"; do    
     echo "Deploy project on server ${array[i]}"
     echo "Current files:"
     ls -al
     echo "Copying file"
     scp -r .gitlab-deploy.sh ubuntu@${array[i]}:FightingPoverty/
     echo "Connecting to EC2 host..."
     ssh ubuntu@${array[i]} "pwd && cd FightingPoverty/api && docker ps"
done