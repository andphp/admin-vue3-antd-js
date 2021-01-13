/* jshint esversion: 6 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// and-design-vue
import "ant-design-vue/dist/antd.css";
// 语言
import VueI18n from "./language";
// 引入icons
import { registerGlobalSvgIconComponent } from "./assets/icons"; // icon

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueI18n)
  .mount("#app");
// 注册SvgIcon全局组件
registerGlobalSvgIconComponent(app);
