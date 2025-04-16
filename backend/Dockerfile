# Use an official Node runtime as a parent image
FROM node:18-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

RUN mkdir -p ./backend/database/migrations

# Build TypeScript code
RUN npm run build



EXPOSE 3001

# Command to run the application
# We run migrations before starting the server.
# Note: Seeding is done separately via docker compose exec or specific entrypoint logic if needed
CMD [ "sh", "-c", "npx sequelize-cli db:migrate && node dist/server.js" ]

