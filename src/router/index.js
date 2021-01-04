import { createRouter, createWebHashHistory } from "vue-router";
import LoginLayout from "@/components/Layouts/LoginLayout";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/index.vue")
  },
  {
    path: "/login",
    component: LoginLayout,
    name: "LoginLayout",
    redirect: { name: "login" },
    children: [
      {
        path: "/account/login",
        name: "login",
        component: () => import("../views/account/Login.vue"),
        hidden: true
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
