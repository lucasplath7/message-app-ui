FROM node:22-alpine AS build

WORKDIR /app

ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

ARG VITE_SOCKET_URL=
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL

ARG VITE_SOCKET_PATH=/socket.io
ENV VITE_SOCKET_PATH=$VITE_SOCKET_PATH

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine

COPY --from=build /app/dist /usr/share/caddy
EXPOSE 80