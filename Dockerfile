FROM node:18-alpine

# Install mysql client
RUN apk add --no-cache mysql-client

# Set working directory
WORKDIR /app

# Copy package.json & lock file first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# ✅ Create uploads folder inside public (so Next.js serves it automatically)
RUN mkdir -p /app/public/uploads

# Build Next.js app
RUN npm run build

# Set environment
ENV NODE_ENV=production

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
