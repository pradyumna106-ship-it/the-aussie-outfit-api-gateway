FROM node:20-alpine

WORKDIR /the-aussie-outfit-api-gateway

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm", "start"]