FROM node:12.2.0-alpine as build
ENV NODE_ENV=production
WORKDIR /app
COPY . ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
