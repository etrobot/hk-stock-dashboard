# 使用 Node.js 20 Alpine 作为构建环境
FROM node:20-alpine as build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package.json pnpm-lock.yaml* ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制项目文件
COPY . .

# 构建应用
RUN pnpm build

# 使用 Node.js 作为生产服务器
FROM node:20-alpine as production

# 设置工作目录
WORKDIR /app

# 复制构建产物
COPY --from=build /app/dist ./dist

# 安装静态文件服务器
RUN npm install -g serve

# 暴露 3456 端口
EXPOSE 3456

# 设置环境变量
ENV HOST=0.0.0.0
ENV PORT=3456

# 启动静态文件服务器，配置 SPA 路由
CMD ["npx", "serve", "-s", "dist", "-l", "3456"]

