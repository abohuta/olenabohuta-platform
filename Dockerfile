FROM node:20-alpine
WORKDIR /app
COPY bot-zk/package*.json ./
RUN npm ci
COPY bot-zk/ .
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/index.js"]
