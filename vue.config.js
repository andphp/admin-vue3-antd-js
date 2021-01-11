const path = require("path");
// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  // 构建项目生成的目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devDist",
  // 关闭语法的自动检测
  lintOnSave: true,
  configureWebpack: {
    devtool: "source-map"
  },
  chainWebpack: config => {
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(path.resolve("src/assets/svg")) //处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  },
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 less-loader
        lessOptions: {
          modifyVars: {
            "primary-color": "#1DA57A",
            "link-color": "#1DA57A",
            "border-radius-base": "2px"
          },
          javascriptEnabled: true // 这句话必须要，否则不起效
        }
      }

    }
  }
};
