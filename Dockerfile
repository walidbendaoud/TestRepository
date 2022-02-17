FROM node:14.16 as builder
WORKDIR /intermediate
COPY ./package*.json ./
RUN yarn install
COPY . .

ENV API=http://188.165.159.208:8884/v1/api/extra-fields
ENV DB=default;custom
ENV APPS=omniflow;custom
RUN npm run build
RUN npm run generate 

FROM nginx:stable
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /intermediate/dist /app/