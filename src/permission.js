import Vue from "vue";
import router from "./router"; //引入创建的路由对象
import store from "./store";

import NProgress from "nprogress"; // 引入加载进度条
import "nprogress/nprogress.css"; // progress bar style
import { ACCESS_TOKEN } from "@/store/mutation-types";

const whiteList = ["login"]; // no redirect whitelist

// 路由全局前置守卫,当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
// to: Route: 即将要进入的目标 路由对象;
// from: Route: 当前导航正要离开的路由;
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
router.beforeEach((to, from, next) => {
  //NProgress.start(); //进度条开始
  //判断token
  if (Vue.ls.get(ACCESS_TOKEN)) {
    // 即将要进入的路由
    if (to.path === "/user/login") {
      // 下一个要进入的路由
      next({ path: "/dashboard/workplace" });
      // NProgress.done();
    } else {
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({ path: "/user/login", query: { redirect: to.fullPath } });
      // NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  // NProgress.done(); // finish progress bar
});
