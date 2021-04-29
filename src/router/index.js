import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/apa/layouts";
// 白名单 路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/account/login"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/error/403"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/navigation",
    name: "Navigation",
    component: Layout,
    redirect: "/index",
    meta: {
      title: "系统管理",
      icon: "caidanlan-bangong",
      hidden: true,
      alwaysShow: false,
    },
    children: [
      {
        path: "index",
        name: "NavigationCard",
        component: () => import("@/views/navigation_card"),
        meta: {
          title: "系统管理菜d单",
          icon: "caidanlan-bangong",
          hidden: false,
          alwaysShow: true,
          tagHidden: true,
        },
      },
    ],
  },
];

export const asyncRoutes = [
  {
    path: "/",
    name: "dashboard",
    component: Layout,
    redirect: "/welcome",
    meta: {
      title: "仪表盘",
      icon: "caidanlan-bangong",
      hidden: false,
      alwaysShow: true,
    },
    children: [
      {
        path: "welcome",
        name: "Welcome",
        component: () => import("@/views/dashboard/welcome"),
        meta: {
          title: "欢迎页",
          icon: "caidanlan-bangong",
          hidden: false,
          alwaysShow: true,
          affix: true,
        },
      },
    ],
  },
  {
    path: "/system",
    name: "system",
    component: Layout,
    redirect: "/index",
    meta: {
      title: "系统管理",
      icon: "caidanlan-bangong",
      hidden: false,
      alwaysShow: false,
    },
    children: [
      {
        path: "meuns",
        name: "Meuns",
        component: () => import("@/views/system/meuns"),
        meta: {
          title: "系统管理菜单",
          description: "系统管理菜单 描述详情",
          icon: "caidanlan-bangong",
          hidden: false,
          alwaysShow: true,
        },
      },
      {
        path: "api",
        name: "apis",
        component: () => import("@/views/system/apis"),
        meta: {
          title: "接口管理",
          description: "接口管理 描述详情",
          icon: "caidanlan-xiaoshou-xiangmuguanli",
          hidden: false,
          alwaysShow: true,
        },
      },
      {
        path: "meun",
        name: "meuns",
        component: () => import("@/views/system/meuns"),
        meta: {
          title: "菜单管理",
          description: "菜单管理 描述详情",
          icon: "caidanlan-kucun-kucunchanpinliebiao",
          hidden: false,
          alwaysShow: true,
        },
      },
    ],
  },
];
const routes = new Set([...constantRoutes, ...asyncRoutes]);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

// 写一个重置路由的方法，切换用户后，或者退出时清除动态加载的路由
export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  router.matcher = newRouter.matcher; // 新路由实例matcer，赋值给旧路由实例的matcher，（相当于replaceRouter）
}
