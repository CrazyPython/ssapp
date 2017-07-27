FROM node:4-onbuild
WORKDIR /usr/src/ssapp
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "npm", "start" ]