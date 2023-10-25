FROM node:alpine

WORKDIR /app-web

COPY package.json ./

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["npm", "run", "start"]