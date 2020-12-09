FROM node:12.2.0-alpine as build

WORKDIR /app
COPY . ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
