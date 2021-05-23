import SvgIcon from "@/components/Icons/SvgIcon.vue"; // svg component

// 需要在main.js文件中进行注册
export const registerGlobalSvgIconComponent = (app) => {
  app.component("svg-icon", SvgIcon);
};

// 扫描后缀名为SVG的文件。
const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
requireAll(req);
