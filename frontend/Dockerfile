FROM node:20-slim AS builder

WORKDIR /app

ARG NEXT_PUBLIC_MAIN_EMAIL
ARG NEXT_PUBLIC_API_BASE
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID

ENV NEXT_PUBLIC_MAIN_EMAIL=$NEXT_PUBLIC_MAIN_EMAIL
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID

COPY package.json package-lock.json* ./
RUN npm install --production=false --no-audit --no-fund

COPY . .
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app .

EXPOSE 3000

CMD ["npm", "run", "start"]
