FROM node:alpine

WORKDIR /src
COPY . /src

RUN npm i

EXPOSE 10000
CMD ["node", "index"]