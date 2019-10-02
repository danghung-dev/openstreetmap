FROM node:10.15.3-alpine as dist
WORKDIR /tmp/
COPY package.json yarn.lock tsconfig.json tsconfig.build.json ./
COPY src/ src/
RUN yarn
RUN yarn build

FROM node:10.15.3-alpine as node_modules
WORKDIR /tmp/
COPY package.json yarn.lock ./
RUN yarn install --production

FROM node:10.15.3-alpine
WORKDIR /usr/local/nub-api
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist
COPY .env ./
CMD ["node", "dist/index.js"]