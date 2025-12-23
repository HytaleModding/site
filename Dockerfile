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
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN apk add --no-cache git

ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM oven/bun:alpine AS runner
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/content/projects ./content/projects

USER nextjs
EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "run", "start"]