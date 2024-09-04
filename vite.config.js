import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import postCssPxToRem from 'postcss-pxtorem'

const root = process.cwd();
const pathResolve = (path) => resolve(root, path);

export default defineConfig({
  plugins: [vue()],
  //设置路径别名，简化模块导入
  resolve: {
    alias: {
      //"@" 被用作 src 目录的别名
      "@": pathResolve("src"),//将 "@" 别名解析到项目的 src 目录，方便在项目中通过 @ 来引用 src 下的文件。
    },
  },
  server: {
    host:'0.0.0.0' ,//允许局域网访问
    proxy: {
      "/api": {//以 /api 开头的请求都会被代理
        target: "https://m.zegec.com",//代理目标地址，所有匹配的请求将被转发到这个地址
        changeOrigin: true,//将请求头中的 origin 改为目标地址
      },
    },
  },
  optimizeDeps: {
    include: ['lodash-es']
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 192,
          propList: ["*"],
          exclude:/node_modules/i
        }),
      ],
    },
  },
});
