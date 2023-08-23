FROM node:18-alpine

# Create app directory

WORKDIR /app

# Install app dependencies

COPY package*.json ./
COPY public/ ./public
COPY src/ ./src

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]