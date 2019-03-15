#FROM centos:centos6
FROM node:10.15.2
MAINTAINER JafarRezaei

#RUN yum -y update; yum clean all
#RUN yum -y install epel-release; yum clean all

#ADD . /src

ENV HOST 0.0.0.0
ENV PORT 80

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm i yarn -g
RUN yarn install

EXPOSE 80

CMD ["npm", "start"]