FROM node:24-alpine AS builder

WORKDIR /src

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

#--------------------------------------

FROM nginx:alpine AS runner

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /src/dist /usr/share/nginx/html

EXPOSE 80
