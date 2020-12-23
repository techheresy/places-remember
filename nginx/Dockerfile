# build
FROM node:latest as frontend
WORKDIR /app/

COPY frontend/package.json frontend/package-lock.json /app/
RUN npm install

COPY frontend /app/
COPY .env /app/.env
RUN npm run build

# distribution
FROM nginx:latest

COPY nginx/prod.conf /etc/nginx/nginx.conf
COPY --from=frontend /app/build/ /build/

CMD ["nginx", "-g", "daemon off;"]
