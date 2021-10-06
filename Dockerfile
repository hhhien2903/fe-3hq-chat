FROM node:12
RUN mkdir /app
WORKDIR /app
ADD . /app
RUN yarn
RUN npm install -g serve
EXPOSE 3000
RUN npm run build:prod
CMD ["serve","-p","3000","-c","1","-s","build"]
