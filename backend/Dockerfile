# Use an official Node runtime as a parent image
FROM node:18-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.sequelizerc ./
COPY --from=builder /app/src/config/config.js ./src/config/config.js # Sequelize CLI needs this
COPY --from=builder /app/database ./database # Migrations and Seeders

# Explicitly copy .env or rely on docker-compose to inject it
# COPY .env . # Generally not recommended to copy .env into image

EXPOSE 3001 # Default backend port

# Command to run the application
# We run migrations before starting the server.
# Note: Seeding is done separately via docker compose exec or specific entrypoint logic if needed
CMD [ "sh", "-c", "npx sequelize-cli db:migrate && node dist/server.js" ]

