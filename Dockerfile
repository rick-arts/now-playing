FROM node:alpine3.13 as BUILD_IMAGE

ENV NODE_ENV production

LABEL maintainer="Roefja | www.roefja.com"

WORKDIR /usr/src/app

RUN apk update && apk add curl bash rsync
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

COPY . .

RUN npm ci --only=production

RUN /usr/local/bin/node-prune

FROM node:alpine3.13 

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/ ./

EXPOSE 80

CMD ["node", "server.js"]