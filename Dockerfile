FROM node:0.10-onbuild
MAINTAINER YIRAN Mao <yiranmao@gmail.com>

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# EXPOSE
EXPOSE 3000

# COPY THE SOURCE CODE
COPY . /usr/src/app
RUN npm install
