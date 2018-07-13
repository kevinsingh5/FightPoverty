#!/bin/bash

#Get servers list
set -f
server=$DEPLOY_SERVER
array=(${server//,/ })

#Iterate servers for deployment
for i in "${!array[@]}"; do    
     echo "Staging project on server ${array[i]}"
     echo "Current files:"
     ls -al
     echo "Copying backend files..."
     scp -v -r backend/ ubuntu@${array[i]}:FightingPoverty/
     echo "Connecting to EC2 host..."
     ssh ubuntu@${array[i]} "pwd && cd FightingPoverty/backend && make install && make run && make test && echo ALL TESTS PASSING && cd ~/FightingPoverty/api && docker ps && docker stop fightpoverty && docker rm fightpoverty && docker build -t fp . && docker run --link mysql01:mysql -d -p 80:80 --name fightpoverty -t fp && docker ps"
     echo "Successfully deployed Flask app on EC2 Docker container"
done