/* jshint esversion: 6 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// and-design-vue
import "ant-design-vue/dist/antd.css";
// 语言
import VueI18n from "./language";
// svg全局组件
import SvgIcon from "@/components/Svgicon";
// svg文件解析
import "./utils/svg";
import { Modal, Notification, Tabs, Message } from "ant-design-vue";

createApp(App)
  .use(store)
  .use(router)
  .use(VueI18n)
  .use(Modal, Notification, Tabs, Message)
  .component("svg-icon", SvgIcon)
  .mount("#app");
