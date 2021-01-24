import router from "@/router";
import path from "path";
import { rolesControl } from "@/config";
import { isExternal } from "@/utils/validate";
import { hasRole } from "@/utils/hasRole";

/**
 * @description all模式渲染后端返回路由,支持包含views路径的所有页面
 * @param asyncRoutes
 * @returns {*}
 */
export function convertRouter(asyncRoutes) {
  return asyncRoutes.map(route => {
    if (route.component) {
      if (route.component === "Layout") {
        route.component = resolve => require(["@/apa/layouts"], resolve);
      } else {
        const index = route.component.indexOf("views");
        const path =
          index > 0 ? route.component.slice(index) : `views/${route.component}`;
        route.component = resolve => require([`@/${path}`], resolve);
      }
    }
    if (route.children && route.children.length)
      route.children = convertRouter(route.children);
    if (route.children && route.children.length === 0) delete route.children;
    return route;
  });
}

/**
 * @description 根据roles数组拦截路由
 * @param routes
 * @param baseUrl
 * @returns {[]}
 */
export function filterRoutes(routes, baseUrl = "/") {
  return routes
    .filter(route => {
      if (rolesControl && route.meta && route.meta.roles)
        return hasRole(route.meta.roles);
      else return true;
    })
    .map(route => {
      if (route.path !== "*" && !isExternal(route.path))
        route.path = path.resolve(baseUrl, route.path);
      route.fullPath = route.path;
      if (route.children)
        route.children = filterRoutes(route.children, route.fullPath);
      return route;
    });
}

/**
 * 根据当前页面firstMenu
 * @returns {string}
 */
export function handleFirstMenu() {
  const firstMenu = router.currentRoute.matched[0].path;
  if (firstMenu === "") return "/";
  return firstMenu;
}
