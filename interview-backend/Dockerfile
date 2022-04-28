FROM node:14.4-alpine3.11

WORKDIR /var/www/QA-Interview-Backend

COPY . .

RUN npm install pm2 -g
RUN apk add yarn
RUN yarn install

EXPOSE 8080

CMD yarn run start