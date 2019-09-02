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
    proxy: {
      "/api": {
        target:
          "https://www.easy-mock.com/mock/5d6c6a1f18025466362a5cd7/currency/", //easymock项目地址
        // target: "http://192.168.1.130:8080/",
        ws: false,
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "/api": "/"
        }
      }
    }
  }
};
