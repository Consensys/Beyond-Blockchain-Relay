FROM node:8.12.0

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

EXPOSE 4000

CMD [ "npm", "start"]