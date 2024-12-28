# Step 1: Build the Angular app
FROM node:20-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the entire project
COPY . .

# Build the Angular app for production
RUN yarn build --localize

# Step 2: Set up Nginx to serve the app
FROM nginx:1.25 AS production-stage

# Copy built Angular app to Nginx's html directory
COPY --from=build-stage /app/dist/browser /usr/share/nginx/html

# Copy Nginx configuration
COPY /nginx.conf  /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
