# Use Node 22.20.0 base image
FROM node:22.20.0

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Expose the Vite dev port
EXPOSE 5173

# Run Vite with host 0.0.0.0 so it's accessible outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

