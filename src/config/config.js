/**
 * @description 导出自定义配置，用来覆盖默认配置
 *
 */
const config = {
  layout: "comprehensive", // horizontal vertical Comprehensive
  templateFolder: "project",
  // authentication: "intelligence",
  routesWhiteList: ["/login", "/register", "/callback", "/404", "/403"],
  title: "",
  logo: "logo.png",
  openMaxTabs: 15,
  requestTimeout: 30000, // 30秒
  fixedHeader: true,
};
module.exports = config;
