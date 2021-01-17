const path = require("path");
const resolve = dir => path.join(__dirname, dir);
// vue.config.js
module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  // 构建项目生成的目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devDist",
  // 关闭语法的自动检测
  lintOnSave: true,
  configureWebpack: {
    devtool: "source-map"
  },
  chainWebpack: config => {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type("javascript/auto")
      .use("i18n")
      .loader("@intlify/vue-i18n-loader")
      .end();
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
