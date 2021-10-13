FROM node:9

RUN apt-get update

WORKDIR /opt/test

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8093
CMD [ "npm", "start" ]

