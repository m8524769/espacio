FROM node:13.4.0-alpine as node

RUN apk add --no-cache git

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN $(npm bin)/ng build --prod

FROM nginx:1.17.6-alpine

COPY --from=node /app/dist/espacio /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
