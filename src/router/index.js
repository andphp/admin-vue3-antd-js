import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/index.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/Login.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
