FROM node:latest
MAINTAINER LYJ

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN yarn
RUN yarn build
RUN apk add --no-cache git

COPY . /app
CMD ["yarn", "start"]