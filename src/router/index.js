import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/apa/layouts";
// 白名单 路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/account/login"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/error/403"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: {
      hidden: true
    }
  }
];

export const asyncRoutes = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/index",
    meta: {
      title: "首页",
      icon: "home",
      hidden: false,
      alwaysShow: false
    },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页1",
          icon: "home",
          hidden: false,
          alwaysShow: true
        },
        children: [
          {
            path: "index11",
            name: "Index11",
            component: () => import("@/views/index/index"),
            meta: {
              title: "首页11",
              icon: "home",
              hidden: false
            }
          }
        ]
      },
      {
        path: "index1",
        name: "Index1",
        component: () => import("@/views/index/index"),
        meta: {
          title: "首页2",
          icon: "home",
          hidden: false
        }
      }
    ]
  },
  {
    path: "/welcome",
    component: () => import("@/views/welcome"),
    meta: {
      title: "欢迎",
      icon: "user",
      hidden: false
    }
  }
];
const routes = new Set([...constantRoutes, ...asyncRoutes]);

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

//写一个重置路由的方法，切换用户后，或者退出时清除动态加载的路由
export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHashHistory(),
    routes
  });
  router.matcher = newRouter.matcher; // 新路由实例matcer，赋值给旧路由实例的matcher，（相当于replaceRouter）
}
