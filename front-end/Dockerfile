FROM node:14.15.0-alpine
MAINTAINER LYJ

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN yarn install --no-cache
RUN yarn install -g react-scripts
RUN yarn install -g react-router-dom
RUN apk add --no-cache git

COPY . /app
CMD ["yarn", "start"]