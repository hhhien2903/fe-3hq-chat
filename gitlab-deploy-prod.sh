#!/bin/bash

set -f
string=$PROD_DEPLOY_SERVER
array=(${string//,/})

# Interate server
echo "Deploy project server ${string}"
ssh ubuntu@${string} "cd /opt/fe-3hq-chat/ && sudo git pull && sudo sh deploy-prod.sh"
