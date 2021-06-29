/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from "@/router";
import router from "@/router";
import { getRouterList } from "@/api/router";
import { convertRouter, filterRoutes } from "@/utils/routes";

const state = { routes: [], partialRoutes: [] };
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes
};
const mutations = {
  setRoutes(state, routes) {
    state.routes = routes;
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = routes;
  }
};
const actions = {
  /**
   * @description 多模式设置路由
   * @param {*} { commit }
   * @param mode
   * @returns
   */
  async setRoutes({ commit }, mode = "intelligence") {
    let routes = asyncRoutes;
    if (mode === "all") {
      const { data } = await getRouterList();
      if (data[data.length - 1].path !== "*") {
        data.push({
          path: "/:pathMatch(.*)*",
          name: "notfound",
          redirect: "/404",
          meta: { hidden: true }
          // component: () => import("@/views/error/404"),
        });
        // data.push({ path: "*", redirect: "/404", hidden: true });
      }


      routes = convertRouter(data);
    }
    const finallyRoutes = filterRoutes([...constantRoutes, ...routes]);
    commit("setRoutes", finallyRoutes);
    return [...routes];
  },
  /**
   * @description 画廊布局、综合布局设置路由
   * @param {*} { commit }
   * @param accessedRoutes 画廊布局、综合布局设置路由
   */
  setPartialRoutes({ commit }, accessedRoutes) {
    commit("setPartialRoutes", accessedRoutes);
  },
  async resetRoutes({ commit }, routes) {
    commit("setRoutes", routes);
  }
};
export default { state, getters, mutations, actions };
