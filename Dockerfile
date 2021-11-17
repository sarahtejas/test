FROM node:10-alpine as base

## Set NODE_ENV to production so that `yarn install` only installs production dependencies
ENV NODE_ENV=production

## Set the BUILD_ID to match CIRCLE_SHA1 or default to null
ENV BUILD_ID=${CIRCLE_SHA1:-}

# openssl is still vulnerable to CVE-2019-1549 on 3.9 so we need to use the 3.10 repo
RUN apk upgrade --no-cache --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/main openssl \
    # Due to CVE-2019-14697
    && apk upgrade --no-cache musl musl-utils \
    # For CVE-2019-15847, ensure gcc >= 9.3.0-r0
    && apk upgrade --no-cache gcc \
    # Uninstall npm
    # We use yarn, which is installed independently in the node alpine docker image.
    # npm has shipped with CVEs multiple times, producing TwistLock failures that
    # wouldn't actually affect us in prod. By removing npm, we leave only the dependencies
    # in our project, which are within our control to update when needed.
    # Example from docker-node master at the time of this writing:
    # https://github.com/nodejs/docker-node/blob/bbb46b714097cd3115a819d86192e1473365a84b/10/alpine/Dockerfile#L61-L62
    && npm uninstall -g npm \
    && mkdir /app

WORKDIR /app

COPY package.json yarn.lock ./

# Start a separate Docker build stage so that NPM_TOKEN doesn't leak into
# Docker commit history
FROM base as base-private

# Install dependencies with a token passed in at build time. Ensure that the
# token is not saved to Docker history or in the final image filesystem.
ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc && \
    yarn install --frozen-lockfile && \
    rm -f .npmrc

FROM base

COPY --from=base-private /app /app

COPY ./.next .next
# Without copying over the ts-config
# our ts-paths will not work
COPY ./tsconfig.json ./
COPY ./src/tsconfig.json ./src/
COPY ./next.config.js ./

CMD ["yarn", "start-production"]
EXPOSE 80
