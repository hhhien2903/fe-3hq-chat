#!/bin/bash

set -f
string=$PROD_DEPLOY_SERVER
array=(${string//,/})

# Interate server
echo "Deploy project server ${string}"
ssh ubuntu@${string} "sudo su && cd /opt/fe-3hq-chat/ && git pull && sh deploy-prod.sh"
done
