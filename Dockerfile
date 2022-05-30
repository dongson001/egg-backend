# 这里我用的镜像是 node 的稳定版
FROM node:10.16.3-alpine

# 拷贝项目文件进行构建
WORKDIR /app/Microservice
COPY ./Microservice/package.json ./
RUN npm install --registry=https://registry.npm.taobao.org

# 拷贝项目文件
COPY ./Microservice/* ./

# 启动服务
CMD ["npm","run","dev"]

# 暴露 7002 端口到宿主机
EXPOSE 7002
