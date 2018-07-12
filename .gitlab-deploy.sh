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
     echo "Copying file"
     scp -r api/app.py ubuntu@${array[i]}:FightingPoverty/api/
     echo "Connecting to EC2 host..."
     ssh ubuntu@${array[i]} "pwd && cd FightingPoverty/api && docker ps && docker stop fightpoverty && docker rm fightpoverty && docker build -t fp . && nohup docker run --link mysql01:mysql -p 80:80 --name fightpoverty -t fp > dockerrun.log ~&"
done