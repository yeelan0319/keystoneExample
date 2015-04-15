FROM node:0.10-onbuild
MAINTAINER YIRAN Mao <yiranmao@gmail.com>

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# EXPOSE
EXPOSE 3000
EXPOSE 3001
