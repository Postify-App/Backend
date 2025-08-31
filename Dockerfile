FROM node AS base

WORKDIR /app
COPY package*.json .

FROM base AS development

RUN npm i
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS builder

RUN npm ci
COPY . .
RUN npm run build

FROM base AS production

RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
CMD [ "npm", "run", "start" ]