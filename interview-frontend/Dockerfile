FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app
    
COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000
CMD [ "http-server", "dist" ]