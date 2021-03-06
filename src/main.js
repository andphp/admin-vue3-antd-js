/* jshint esversion: 6 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 常量
import "./constants";
// and-design-vue

import "ant-design-vue/dist/antd.css";
// 语言
import { i18n } from "./language";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});
/* 引入icons
   import SvgIcon from "@/apa/components/Icons/SvgIcon.vue";
   import "@/apa"; */

/**
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
/* console.log("process.env.NODE_ENV", process.env.NODE_ENV);
   if (process.env.NODE_ENV === "development") {
     const { mockXHR } = require("@/utils/static");
     mockXHR();
   } */
if (process.env.NODE_ENV === "development") {
  const { mockXHR } = require("@/utils/static");
  mockXHR();
}

// 注册常用组件
import cp from "./components";
const app = createApp(App);
import {
  Form,
  Input,
  Card,
  Button,
  Table,
  Divider,
  Row,
  Col,
  Modal,
  Radio,
  Select,
  Dropdown,
  Menu,
  Checkbox,
  Tree,
  TreeSelect,
  Space,
  Spin,
  InputNumber,
  Tabs,
  Alert,
  Switch,
  Image,
  Upload,
  DatePicker,
  Tag,
  Badge,
  Tooltip,
} from "ant-design-vue";
app
  .use(store)
  .use(router)
  .use(i18n)
  .use(Form)
  .use(Input)
  .use(Card)
  .use(Button)
  .use(Table)
  .use(Divider)
  .use(Row)
  .use(Col)
  .use(Modal)
  .use(Radio)
  .use(Select)
  .use(Dropdown)
  .use(Menu)
  .use(Checkbox)
  .use(Tree)
  .use(TreeSelect)
  .use(Space)
  .use(Spin)
  .use(InputNumber)
  .use(Tabs)
  .use(Alert)
  .use(Switch)
  .use(Image)
  .use(Upload)
  .use(DatePicker)
  .use(Tag)
  .use(Badge)
  .use(Tooltip)
  .use(cp);
import "./apa/styles/apa.less";

// 加载布局
const requireLayout = require.context("./apa/layouts", true, /\.vue$/);
requireLayout.keys().forEach((fileName) => {
  const componentConfig = requireLayout(fileName);
  const componentName = componentConfig.default.name;
  app.component(componentName, componentConfig.default || componentConfig);
});

/* 加载组件
   const requireComponent = require.context("./apa/components", true, /\.vue$/);
   requireComponent.keys().forEach(fileName => {
     const componentConfig = requireComponent(fileName);
     const componentName = componentConfig.default.name;
     app.component(componentName, componentConfig.default || componentConfig);
   }); */

import directive from "@/directive";
Object.keys(directive).forEach((d) => {
  app.directive(d, directive[d]);
});
import defaultButtonEnum from "@/plugin/buttons";
app.use(defaultButtonEnum);

import moment from "@/plugin/moment";
app.use(moment);

import myMessage from "@/plugin/message";
app.use(myMessage);

import socketio from "@/plugin/socketio";
app.use(socketio);
app.mount("#app");
import message from "@/utils/message";
app.config.globalProperties.$message = message;
// 加载插件
const requirePlugin = require.context("./apa/plugins", true, /\.js$/);
requirePlugin.keys().forEach((fileName) => {
  requirePlugin(fileName);
});

// 扫描后缀名为SVG的文件。
const req = require.context("./assets/icons", true, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
requireAll(req);
