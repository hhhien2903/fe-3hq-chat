FROM node:12
RUN mkdir /app
WORKDIR /app
ADD . /app
RUN npm install --save
RUN npm install -g serve
EXPOSE 3000
RUN npm run build
CMD ["serve","-p","3000","-c","1","-s","build"]
