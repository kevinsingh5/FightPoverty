#!/bin/bash

#Get servers list
set -f
server=$DEPLOY_SERVER
#array=(${string//,/ })

echo "Deploying project on server $DEPLOY_SERVER"
ssh -i $SSH_PRIVATE_KEY ubuntu@$DEPLOY_SERVER "cd FightingPoverty/api && docker ps"

#Iterate servers for deploy and pull last commit
#for i in "${!array[@]}"do    
#      echo "Deploy project on server ${array[i]}"    
#      ssh ubuntu@${array[i]} "cd /var/www && git pull origin master"
#done