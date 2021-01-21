import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/apa/layouts";
// 白名单 路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/account/login"),
    hidden: true
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/error/403"),
    hidden: true
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    hidden: true
  }
];

export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页"
        }
      }
    ]
  }
];
const routes = new Set([...constantRoutes, ...asyncRoutes]);

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
