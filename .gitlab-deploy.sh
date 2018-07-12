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
     echo "Copying files"
     scp -r api/main.py ubuntu@${array[i]}:FightingPoverty/api/
     scp -r frontend/ ubuntu@${array[i]}:FightingPoverty/
     echo "Connecting to EC2 host..."
     # ssh ubuntu@${array[i]} "pwd && cd FightingPoverty/api && docker ps" #&& docker stop fightpoverty && docker rm fightpoverty && docker build -t fp . && docker run --link mysql01:mysql -p 80:80 --name fightpoverty -t fp ~&"
     ssh ubuntu@${array[i]} "pwd && cd FightingPoverty/frontend/react-app/ && docker ps && docker stop reactapp && docker rm reactapp && docker build -t react . && docker run -p 49160:8080 -d --name reactapp -t react && docker ps && docker logs reactapp"
done