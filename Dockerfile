FROM node:12.2.0-alpine as build

# Create app directory
WORKDIR /usr/src/app

# COPY package.json .
# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# nginx base image
FROM nginx:1.16.0-alpine

# copy static contents of project to nginx html 
COPY  . .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# # Bundle app source
# COPY . .

# EXPOSE 3000

# # Start Node server
# CMD [ "npm", "start" ]
