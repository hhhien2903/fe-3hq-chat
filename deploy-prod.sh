docker pull registry.gitlab.com/thehaung/fe-3hq-chat
docker stop frontend-3hq-production
docker rm frontend-3hq-production
docker run -d -p 3000:80 --name frontend-3hq-production registry.gitlab.com/thehaung/fe-3hq-chat