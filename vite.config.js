import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import postCssPxToRem from "postcss-pxtorem";
import { viteMockServe } from 'vite-plugin-mock';

const root = process.cwd();
const pathResolve = (path) => resolve(root, path);

export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      // 这里可以自定义 mock 文件路径
      mockPath: "mock", // 默认为 './mock'，可以根据需要调整
      localEnabled: true, // 开启本地开发环境
    }),
  ],
  //设置路径别名，简化模块导入
  resolve: {
    alias: {
      //"@" 被用作 src 目录的别名
      "@": pathResolve("src"), //将 "@" 别名解析到项目的 src 目录，方便在项目中通过 @ 来引用 src 下的文件。
    },
  },
  server: {
    host: "0.0.0.0", //允许局域网访问
    proxy: {
      "/api": {
        //以 /api 开头的请求都会被代理
        target: "https://m.zegec.com", //代理目标地址，所有匹配的请求将被转发到这个地址
        // target: "http://192.168.0.15:8001",//代理目标地址，所有匹配的请求将被转发到这个地址
        changeOrigin: true, //将请求头中的 origin 改为目标地址
      },
    },
  },
  optimizeDeps: {
    include: ["lodash-es"],
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 192,
          propList: ["*"],
          exclude: /node_modules/i,
        }),
      ],
    },
  },
  // 添加 base 选项
  //  base: '/api/', // 你可以根据需要修改这个路径

  //  // 添加 build 选项
  //  build: {
  //    outDir: 'dist', // 输出目录，默认为 'dist'
  //    rollupOptions: {
  //      output: {
  //        entryFileNames: 'assets/js/[name]-[hash].js',
  //        chunkFileNames: 'assets/js/[name]-[hash].js',
  //        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
  //      }
  //    }
  //  }
});
