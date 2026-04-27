FROM node:20-alpine AS builder

WORKDIR /app

# Copy monorepo dependencies
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma/

# Install dependencies
RUN npm install
RUN cd apps/api && npm install && npx prisma generate

# Copy source
COPY apps/api/ ./apps/api/

# Build
RUN cd apps/api && npm run build

# Runner stage
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/apps/api/package*.json ./apps/api/
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules/
COPY --from=builder /app/apps/api/dist ./apps/api/dist/
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma/

EXPOSE 3000

CMD ["node", "apps/api/dist/main"]
