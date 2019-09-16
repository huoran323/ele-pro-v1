const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/" : "/",
  chainWebpack: config => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 2048 }));
    config.resolve.alias.set("@", resolve("src"));
  },
  // configureWebpack: {
  //   externals: {
  //     vue: "Vue",
  //     vuex: "Vuex",
  //     "vue-router": "VueRouter",
  //     "element-ui": "ELEMENT"
  //   },
  //   plugins: []
  // }
  devServer: {
    // port: 8080
    // proxy: {
    //   "/api": {
    //     target:
    //
    //     target: "http://192.168.1.106:8080/",
    //     ws: true,
    //     changeOrigin: true, //是否跨域
    //     pathRewrite: {
    //       "/api": "/api"
    //     }
    //   }
    // },

    // host: "localhost",
    // port: "8080",
    // hot: true,
    // open: true,
    // overlay: {
    //   warning: false,
    //   error: true
    // },

    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true, //是否跨域
        secure: false,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  }
};
