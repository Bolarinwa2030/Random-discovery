FROM node:26-alpine

WORKDIR /src

COPY package.json package-lock.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]