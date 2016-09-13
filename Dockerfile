FROM node:6.3

WORKDIR /app

EXPOSE 9000

ADD package.json /app/package.json

RUN npm install

ADD . /app

RUN npm rebuild && npm run build

CMD npm start
