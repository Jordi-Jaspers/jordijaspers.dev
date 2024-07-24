# STEP 1: Define the base image for the application
FROM oven/bun AS base

LABEL description="The portfolio website of Jordi Jaspers."
LABEL maintainer="Jordi Jaspers"

# STEP 2: Create a builder image
FROM base AS builder

# Create a temp directory for the node_modules
RUN mkdir -p /temp/workspace
WORKDIR /temp/workspace

# Copy the necessary files to the temp directory
COPY package.json /temp/workspace/

# Install dependencies into temp directory
# this will cache them and speed up future builds
RUN bun install --frozen-lockfile

# STEP 3: Create a smaller image for running the application
FROM base AS release
RUN mkdir -p /app
WORKDIR /app

# Default environment variables, these can be overwritten when calling "docker run"
ENV VITE_ENV='production' \
    VITE_PORT=3000

# Copy the necessary files to the app directory
COPY . .
COPY --from=builder /temp/workspace/node_modules ./node_modules

# Build the application

# NOTE: For some reason the build command is not working, so I'm using the dev command instead
# RUN bun run build

# Expose the port the application will run on
EXPOSE 3000

# Start the BUN server on port 3000
CMD ["bun", "run", "dev", "--port", "3000"]
