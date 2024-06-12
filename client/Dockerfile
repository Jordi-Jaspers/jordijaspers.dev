# STEP 1: Create a builder image
# The first step build the application so it can copy over the necessary files to the final image.
FROM oven/bun AS builder

LABEL description="The portfolio website of Jordi Jaspers."
LABEL maintainer="Jordi Jaspers"

# Copy the generated jar file in a temporary directory
RUN mkdir /workspace
WORKDIR /workspace

# Copy all the application files to the container
COPY .. .

# These are build arguments that will be set by Jenkins at build time to the running Inbucket container, but
ARG VITE_ENV='production'
ARG VITE_PORT=3000

# Run your build process
RUN bun install --frozen-lockfile && bun run build

# STEP 2: Create a smaller image for running the application
FROM oven/bun

# Default environment variables, these can be overwritten when calling "docker run"
ENV VITE_ENV=$VITE_ENV \
    VITE_PORT=$VITE_PORT

# Copy only the necessary files from the builder image to the final image
COPY --from=builder /workspace/build .

# Expose the port the application will run on
EXPOSE $VITE_PORT

#Start the BUN server
CMD ["bun", "run", "start"]
