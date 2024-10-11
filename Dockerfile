FROM registry.devops.metago-universe.com/third-party/docker.io/library/nginx:1.25
RUN ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo Asia/Shanghai > /etc/timezone
RUN rm -rf /usr/share/nginx/html/
COPY ./dist/ /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html