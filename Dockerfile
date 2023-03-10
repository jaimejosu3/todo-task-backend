FROM node:18.14.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
RUN npm run test
CMD [ "npm", "start" ]
