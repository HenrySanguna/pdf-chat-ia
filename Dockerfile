# Use Node.js 18 with Alpine as the base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager (npm in this case)
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the project using npm
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV OPENAI_API_KEY=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
ENV PINECONE_API_KEY=a2c3cf9c-09e5-425f-916e-4b9d27cc2948
ENV PINECONE_ENVIRONMENT=gcp-starter
ENV PINECONE_INDEX_NAME=scrum-master
ENV PINECONE_NAME_SPACE=namespace
ENV PDF_PATH=url-path
ENV INDEX_INIT_TIMEOUT=240000

# Create a system user and group for running the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public folder
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy necessary files from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the nextjs user
USER nextjs

# Expose port 3000
EXPOSE 3000

# Set environment variables for the app
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Run the app
CMD ["node", "server.js"]