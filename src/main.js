/* jshint esversion: 6 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// and-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// 语言
import VueI18n from "./language";
// svg全局组件
import SvgIcon from "@/components/Svgicon";
// svg文件解析
import "./utils/svg";

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .use(VueI18n)
  .component("svg-icon", SvgIcon)
  .mount("#app");
