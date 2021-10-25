FROM node:latest as build-stage

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN yarn

COPY ./ .
RUN yarn build

FROM nginx as production-stage

RUN mkdir /app

COPY --from=build-stage /app/build /app

COPY nginx.conf /etc/nginx/nginx.conf

RUN service nginx restart