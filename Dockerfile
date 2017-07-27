FROM node:boron
WORKDIR /usr/src/ssapp
COPY package.json package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]

