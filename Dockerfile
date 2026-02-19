FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY src ./src

ENV NODE_ENV=production
ENV PORT=5000
ENV LOG_DIR=/app/logs

EXPOSE 5000

CMD ["npm", "start"]
