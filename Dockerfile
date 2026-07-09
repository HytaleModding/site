FROM oven/bun:alpine AS base
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache python3 make g++ git
COPY bun.lock package.json ./
COPY source.config.ts tsconfig.json ./
RUN mkdir -p content/docs
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
RUN apk add --no-cache git
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .git ./.git

ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM oven/bun:alpine AS runner
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
WORKDIR /app

RUN apk add --no-cache git

COPY --from=builder --chown=nextjs:nodejs /app .

USER nextjs
EXPOSE 8080
ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"
CMD ["bun", "run", "start"]

HEALTHCHECK --interval=5s --timeout=5s --start-period=45s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1