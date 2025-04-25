# Use the official Node.js LTS image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (change if not 3000)
EXPOSE ${BACKEND_INTERNAL_PORT}

# Start the app
CMD [ "npm", "run", "dev"]