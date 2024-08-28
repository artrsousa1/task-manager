FROM node:20-alpine

WORKDIR /home/node/api

RUN apk update && apk upgrade && apk add --no-cache bash

COPY ../api/package.json ./
COPY ../api/package-lock.json ./

RUN npm install

COPY ../api .api

CMD ["npm", "run", "dev"]