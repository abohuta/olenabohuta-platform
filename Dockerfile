FROM node:22-alpine
WORKDIR /app
COPY bot-zk/package.json ./
RUN npm install
COPY bot-zk/src ./src
COPY bot-zk/tsconfig.json ./
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/index.js"]
