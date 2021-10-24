FROM node:latest
MAINTAINER LYJ

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN yarn

COPY . /app
CMD ["yarn", "start"]