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

const app = createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .component("svg-icon", SvgIcon);
import "./apa/styles/apa.scss";

// 加载布局
const requireLayout = require.context("./apa/layouts", true, /\.vue$/);
requireLayout.keys().forEach(fileName => {
  const componentConfig = requireLayout(fileName);
  const componentName = componentConfig.default.name;
  app.component(componentName, componentConfig.default || componentConfig);
});

// 加载组件
// const requireComponent = require.context("./apa/components", true, /\.vue$/);
// requireComponent.keys().forEach(fileName => {
//   const componentConfig = requireComponent(fileName);
//   const componentName = componentConfig.default.name;
//   app.component(componentName, componentConfig.default || componentConfig);
// });
app.mount("#app");
// 加载插件
// const requirePlugin = require.context("./apa/plugins", true, /\.js$/);
// requirePlugin.keys().forEach(fileName => {
//   requirePlugin(fileName);
// });

// 扫描后缀名为SVG的文件。
const req = require.context("./assets/icons/svg", false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
