const path = require("path");
const resolve = dir => path.join(__dirname, dir);

// 全局配置
const {
  // baseURL,
  publicPath,
  assetsDir,
  outputDir,
  transpileDependencies,
  lintOnSave,
  title,
  abbreviation,
  devPort,
  providePlugin,
  build7z
} = require("./src/config");

const { webpackBarName, webpackBanner } = require("./apa.config");
// 时间和日期
const dayjs = require("dayjs");
const date = dayjs().format("YYYY_M_D");
const time = dayjs().format("YYYY-M-D HH:mm:ss");

const { version, author } = require("./package.json");
const Webpack = require("webpack");
const WebpackBar = require("webpackbar");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["html", "js", "css", "svg"];

// mockjs
const mockServer = () => {
  if (process.env.NODE_ENV === "development") {
    return require("./mock/mockServer.js");
  } else {
    return "";
  }
};

process.env.VUE_APP_TITLE = title || "admin-vue-antd";
process.env.VUE_APP_AUTHOR = author || "AndPHP";
process.env.VUE_APP_UPDATE_TIME = time;
process.env.VUE_APP_VERSION = version;
// vue.config.js
module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath,
  assetsDir,
  outputDir,
  transpileDependencies,
  lintOnSave,
  // configureWebpack: {
  //   devtool: "source-map"
  // },
  configureWebpack() {
    return {
      devtool: "source-map",
      resolve: {
        alias: {
          "@": resolve("src"),
          "*": resolve("")
        }
      },
      plugins: [
        new Webpack.ProvidePlugin(providePlugin),
        new WebpackBar({
          name: webpackBarName
        })
      ],
      externals: {
        fsevents: "fsevents"
      }
    };
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
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

    config.when(process.env.NODE_ENV !== "development", config => {
      config.performance.set("hints", false);
      config.devtool("none");
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial"
          }
        }
      });
      config
        .plugin("banner")
        .use(Webpack.BannerPlugin, [`${webpackBanner}${time}`])
        .end();
      config
        .plugin("compression")
        .use(CompressionWebpackPlugin, [
          {
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 8192,
            minRatio: 0.8
          }
        ])
        .end();
    });

    if (build7z) {
      config.when(process.env.NODE_ENV === "production", config => {
        config
          .plugin("fileManager")
          .use(FileManagerPlugin, [
            {
              onEnd: {
                delete: [`./${outputDir}/video`, `./${outputDir}/data`],
                archive: [
                  {
                    source: `./${outputDir}`,
                    destination: `./${outputDir}/${abbreviation}_${outputDir}_${date}.7z`
                  }
                ]
              }
            }
          ])
          .end();
      });
    }
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            "apa-color-blue": "#1890ff",
            "current-color": "#1890ff",
            "apa-margin": "20px",
            "apa-padding": "20px",
            "apa-header-height": "65px"
          }
        }
      }
    }
  },
  devServer: {
    port: devPort,
    // before: mockServer()
    // 注释掉的地方是前端配置代理访问后端的示例
    proxy: {
      ["/mock-server"]: {
        target: `http://ladmin.test/api`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ["^/mock-server"]: ""
        }
      }
    }
  }
};
