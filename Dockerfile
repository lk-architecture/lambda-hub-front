FROM node
MAINTAINER Mondora <mondora@mondora.com>

ADD . /lh-front
WORKDIR /lh-front
RUN npm install
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]
