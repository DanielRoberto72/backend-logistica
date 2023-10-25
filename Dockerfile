# BUILD STEP
FROM public.ecr.aws/docker/library/node:lts-alpine3.17 AS build
WORKDIR /tmp
COPY ["./code/package.json", "./"]
RUN npm install
COPY ["./code", "."]
RUN npx prisma generate
RUN npm run build

# FINAL STEP
FROM public.ecr.aws/docker/library/node:lts-alpine3.17
WORKDIR /usr/src/app
COPY --chown=node:node --from=build ["/tmp/node_modules", "./node_modules"]
COPY --chown=node:node --from=build ["/tmp/dist", "./dist"]
COPY --chown=node:node ["./code/.env", "."]
EXPOSE 3000
USER node
CMD ["node", "dist/main.js"]