FROM node:10

WORKDIR /LongAssLink

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]