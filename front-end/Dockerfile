FROM node:latest

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN yarn install

COPY . /app
EXPOSE 3000
CMD ["yarn", "start"]