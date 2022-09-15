FROM registry.roefja.dev/library/node:alpine-prune as BUILD_IMAGE

ENV NODE_ENV production

LABEL maintainer="Rick Arts | www.rickarts.dev"

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production

RUN /usr/local/bin/node-prune

FROM node:alpine

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/ ./

EXPOSE 80

CMD ["node", "server.js"]