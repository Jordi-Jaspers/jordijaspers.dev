# STEP 1: Define the base image for the application
# Bun version 1.1.x does not work with the MapGL component, so we need to use version 1.0.36
FROM oven/bun:1.0.36 AS base

LABEL description="The portfolio website of Jordi Jaspers."
LABEL maintainer="Jordi Jaspers"

# STEP 2: Create a builder image
FROM base AS builder

# Create a temp directory for the node_modules
RUN mkdir -p /temp/workspace
RUN mkdir -p /temp/workspace/build
WORKDIR /temp/workspace

# Copy the necessary files to the temp directory
COPY . /temp/workspace/

# Install dependencies into temp directory
RUN bun install --frozen-lockfile
RUN bun run build

# STEP 3: Create a smaller image for running the application
FROM base AS release
RUN mkdir -p /app
WORKDIR /app

# Default environment variables, these can be overwritten when calling "docker run"
ENV VITE_ENV='production' \
    VITE_PORT=3000

# Copy the necessary files to the app directory
COPY --from=builder /temp/workspace/build .

# Expose the port the application will run on
EXPOSE 3000

#Start the BUN server
ENTRYPOINT [ "bun", "run", "index.js" ]
