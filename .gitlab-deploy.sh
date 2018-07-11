#!/bin/bash

#Get servers list
set -f
server=$DEPLOY_SERVER
array=(${server//,/ })

#echo "Deploying project on server $DEPLOY_SERVER"
#ssh -i $SSH_PRIVATE_KEY ubuntu@$DEPLOY_SERVER "cd FightingPoverty/api && docker ps"

#Iterate servers for deploy and pull last commit
for i in "${!array[@]}"; do    
    echo "Deploying project on server ${array[i]}"
    echo "$SSH_PRIVATE_KEY" > ~/key.pem
    ssh -i ~/key.pem ubuntu@${array[i]} "cd FightingPoverty/api && docker ps"
done
#      echo "Deploy project on server ${array[i]}"    
#      ssh ubuntu@${array[i]} "cd /var/www && git pull origin master"
#done