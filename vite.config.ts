/*
 * @Author: zhangchen zhang1716680960@163.com
 * @Date: 2023-02-15 14:03:56
 * @LastEditors: zhangchen zhang1716680960@163.com
 * @LastEditTime: 2023-03-08 14:19:17
 * @FilePath: /源码笔记/Users/mac/Downloads/edu-vue3/edu-vue/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from "node:url";
// import path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";
// const pathSrc = path.resolve(__dirname, "src");

// const flag = process.env.USEMOKE;
export default defineConfig({
  //代理
  server: {
    proxy: {
      "/api": {
        target: "http://39.97.218.60/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), //是否要重写api路径
      },
    },
  },
  plugins: [
    AutoImport({
      //自动导入
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
      eslintrc: { enabled: true },
      imports: ["vue"],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(), // 自动导入图标组件
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    vue(),
    viteMockServe({
      mockPath: "./src/mock",
      logger: false,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
