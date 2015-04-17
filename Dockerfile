FROM node:0.10-onbuild
MAINTAINER YIRAN Mao <yiranmao@gmail.com>

#Set working directory
WORKDIR /usr/src/keystonejs
RUN npm install