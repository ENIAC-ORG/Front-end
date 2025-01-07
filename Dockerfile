# Use the official Node.js image as a base
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --force

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Final stage: only export build files
FROM alpine:latest AS production

# Set working directory
WORKDIR /output

# Copy build files
COPY --from=build /app/dist /output

CMD ["sh", "-c", "echo Build output is ready in /output"]

