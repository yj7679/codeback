FROM node:latest
MAINTAINER LYJ

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY . /app

RUN yarn
RUN yarn build

CMD ["yarn", "start"]