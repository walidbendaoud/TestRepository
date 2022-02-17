FROM node:17.0 as builder
WORKDIR /intermediate
COPY ./package*.json ./
RUN npm install
COPY . .
ENV API=http://188.165.159.208:8882
RUN npm run build

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /intermediate/static /app/