FROM node:14
WORKDIR /usr/src/app
COPY ./service ./

RUN npm install