FROM node:14

RUN apt-get update -y && apt-get -y install curl python build-essential git ca-certificates

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "start"]