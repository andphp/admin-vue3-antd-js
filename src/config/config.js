/**
 * @description 导出自定义配置，用来覆盖默认配置
 *
 */
const config = {
  layout: "comprehensive", // horizontal vertical Comprehensive
  templateFolder: "project",
  // authentication: "intelligence",
  routesWhiteList: ["/login", "/register", "/callback", "/404", "/403"],
};
module.exports = config;
