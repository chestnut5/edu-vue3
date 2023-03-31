/*
 * @Author: zhangchen zhang1716680960@163.com
 * @Date: 2023-02-15 14:03:56
 * @LastEditors: zhangchen zhang1716680960@163.com
 * @LastEditTime: 2023-03-08 19:07:23
 * @FilePath: /源码笔记/Users/mac/Downloads/edu-vue3/edu-vue/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router";
import { useTokenStore } from "@/stores/myToken";
// const store=useTokenStore()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/LoginView.vue"),
    },
    {
      path: "/",
      name: "",
      component: () => import("@/components/layout/AppLayout.vue"),
      meta: { requireAuth: true }, //需要登录验证
      children: [
        {
          path: "/about",
          name: "about",
          //路由懒加载
          component: () => import("@/views/AboutView.vue"),
        },
        {
          path: "/menus",
          name: "menus",
          //路由懒加载
          component: () => import("@/views/menu/MenuIndex.vue"),
        },
        {
          path: "/menus/create",
          name: "menu-create",
          //路由懒加载
          component: () => import("@/views/menu/CreateOrEdit.vue"),
        },
        // 编辑
        {
          path: "/menus/:id/edit",
          name: "menu-edit",

          component: () => import("@/views/menu/CreateOrEdit.vue"),
        },
        {
          path: "/resource-category",
          name: "resource-category",
          //路由懒加载
          component: () =>
            import("@/views/resource-category/ResourceCategoryIndex.vue"),
        },
        {
          path: "/resources",
          name: "resources",
          //路由懒加载
          component: () => import("@/views/resources/ResourcesIndex.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          name: "ErrorPage",
          component: () => import("@/views/ErrorPage.vue"),
        },
      ],
    },
  ],
});

/**
 * matched 层层检查
 * /aa/bb/cc/dd
 * /aa
 * /aa/bb
 * /aa/bb/cc
 * /aa/bb/cc/dd
 *
 *
 * to  跳转到那个页面
 * from  表示跳转的起始地址
 * next 表示跳转后<原本的处理地址>
 *    应该加载页面组件  没有next() 就不会加载页面组件  所以必须有next
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta?.requireAuth)) {
    const store = useTokenStore(); //获取存储状态 由其加载顺序 在当前函数外面调用

    // 不存在 access_token 时 跳转到login 并且将原本要跳转的页面以query的形式传递
    if (!store.token.access_token) {
      // 登录成功
      next({
        name: "login",
        query: {
          redirect: to.fullPath, // 将跳转的路由path作为参数，登录成功后跳转到该路由
        },
      });
      return;
    }
  }
  next(); //如果不要求权限 或者存在access_token 就按原计划跳转
});

export default router;
