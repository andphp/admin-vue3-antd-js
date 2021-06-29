/**
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from "@/router";
import store from "@/store";
import getPageTitle from "./pageTitle";
import {
  authentication,
  loginInterception, // 是否开启 登录拦截
  recordRoute,
  routesWhiteList,
} from "@/config";

import NProgress from "nprogress";
import { openMaxTabs } from "@/config";
import $message from "@/utils/message";
router.beforeEach(async(to, from, next) => {
  let currentTabCount = store.getters["tagsBar/visitedRoutes"].length;
  if (currentTabCount >= openMaxTabs) {
    $message.error(`选项卡打开数量已到上限数${openMaxTabs}，请先关闭不需要的选项卡之后再打开`);
    next(false);
    return false;
  }
  NProgress.start();
  let hasToken = store.getters["user/token"];

  if (!loginInterception) hasToken = true;
  // console.log("hasToken", hasToken);
  if (hasToken) {
    if (to.path === "/login") {
      // next({ path: "/" });
    } else {
      const hasRoles =
        store.getters["acl/admin"] ||
        store.getters["acl/role"].length > 0 ||
        store.getters["acl/ability"].length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          if (loginInterception) {
            await store.dispatch("user/getUserInfo");
          } else {
            // loginInterception为false（关闭登录拦截时）时，创建虚拟角色
            await store.dispatch("user/setVirtualRoles");
          }
          let accessRoutes = [];

          /* if (authentication === 'intelligence') {
               accessRoutes = await store.dispatch('routes/setRoutes');
             } else if (authentication === 'all') {
               accessRoutes = await store.dispatch('routes/setAllRoutes');
             } */

          accessRoutes = await store.dispatch(
            "routes/setRoutes",
            authentication
          );
          // console.log(router.getRoutes());
          accessRoutes.forEach((item) => {
            router.addRoute(item);
            // console.log(item);
          });

          next({ ...to, replace: true });
        } catch (err) {
          console.log(err);
          await store.dispatch("user/resetAll");
          if (recordRoute) {
            next({
              path: "/login",
              query: { redirect: to.path },
              replace: true,
            });
          } else next({ path: "/login", replace: true });
        }
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (recordRoute) {
        next({ path: "/login", query: { redirect: to.path }, replace: true });
      } else next({ path: "/login", replace: true });
    }
  }
});
router.afterEach((to) => {
  NProgress.done();
  document.title = getPageTitle(to.meta.title);
});
