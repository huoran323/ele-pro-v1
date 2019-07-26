import "@babel/polyfill";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import { VueAxios } from "./utils/request";

// mock
import "./mock";

import "./core/use"; // 引入配置
import "./permission"; // permission control

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(VueAxios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
