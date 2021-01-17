/* jshint esversion: 6 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// and-design-vue
import "ant-design-vue/dist/antd.css";
// 语言
import { i18n } from "./language";
// 引入icons
import SvgIcon from "@/components/Icons/SvgIcon.vue";

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .component("svg-icon", SvgIcon)
  .mount("#app");
// 扫描后缀名为SVG的文件。
const req = require.context("./assets/icons/svg", false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
