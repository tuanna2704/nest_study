FROM node:14.17.4-alpine

WORKDIR /app

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
