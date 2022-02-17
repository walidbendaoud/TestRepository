FROM node:14.16 as builder
WORKDIR /intermediate
COPY ./package*.json ./
RUN npm install
COPY ./sapper .
RUN npm run export

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /intermediate/__sapper__/export/ /app/