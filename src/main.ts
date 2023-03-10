/*
 * @Author: zhangchen zhang1716680960@163.com
 * @Date: 2023-02-15 14:03:56
 * @LastEditors: zhangchen zhang1716680960@163.com
 * @LastEditTime: 2023-03-08 14:26:34
 * @FilePath: /源码笔记/Users/mac/Downloads/edu-vue3/edu-vue/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import "@/styles/index.scss";
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.mount("#app");
