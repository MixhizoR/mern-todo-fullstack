FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE ${FRONTEND_INTERNAL_PORT}

CMD ["npm", "run", "dev"]
