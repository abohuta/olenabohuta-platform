FROM node:22-alpine
WORKDIR /app

# Build bot-zk
COPY bot-zk/package.json ./bot-zk/
RUN cd bot-zk && npm install
COPY bot-zk/src ./bot-zk/src
COPY bot-zk/tsconfig.json ./bot-zk/
RUN cd bot-zk && npm run build

# Build bot-school
COPY bot-school/package.json ./bot-school/
RUN cd bot-school && npm install
COPY bot-school/src ./bot-school/src
COPY bot-school/tsconfig.json ./bot-school/
RUN cd bot-school && npm run build

EXPOSE 3001
CMD ["sh", "-c", "node bot-zk/dist/index.js & NO_SERVER=true node bot-school/dist/index.js & wait"]
