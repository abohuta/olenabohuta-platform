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

COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 3001
CMD ["./start.sh"]
