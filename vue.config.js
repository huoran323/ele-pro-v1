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
    port: 8080
    // proxy: {
    //   "/api": {
    //     // target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //     target: "http://192.168.1.130:8080/",
    //     ws: false,
    //     changeOrigin: true, //是否跨域
    //     pathRewrite: {
    //       "/api": "/"
    //     }
    //   }
    // }
  }
};
