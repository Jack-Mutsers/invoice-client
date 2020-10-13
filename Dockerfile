### STAGE 1: Build ###
FROM node:latest AS node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/service-client /usr/share/nginx/html