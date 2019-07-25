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
  }
  // configureWebpack: {
  //   externals: {
  //     vue: "Vue",
  //     vuex: "Vuex",
  //     "vue-router": "VueRouter",
  //     "element-ui": "ELEMENT"
  //   },
  //   plugins: []
  // }
};
