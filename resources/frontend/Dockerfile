# Use a compatible Node.js version
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy only package files for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use Nginx to serve the built files
# FROM nginx:alpine

# Copy the build output to Nginx's public directory
# COPY --from=builder /app/out /usr/share/nginx/html

# Expose the default Nginx port
# EXPOSE 80

# Run 
CMD ["npm", "run","dev"]