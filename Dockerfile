# Stage 1: Build the React app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Build React app
RUN npm run build

# Stage 2: Serve the build with 'serve'
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the built app from previous stage
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 3000

# Start app
CMD ["serve", "-s", "build", "-l", "3000"]
