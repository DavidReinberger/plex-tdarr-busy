FROM node:lts AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM builder AS plex-tdarr-busy
COPY --from=builder app/dist ./

CMD node index.js
