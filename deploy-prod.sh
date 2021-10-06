docker build -t 3hq-chat-production . 
docker stop 3hq-chat-production  
docker rm 3hq-chat-production 
docker run -d --name 3hq-chat-production -p 3000:3000 -t 3hq-chat-production
