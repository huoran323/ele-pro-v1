import Vue from "vue";
import router from "./router"; //引入创建的路由对象
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // 引入加载进度条
import "nprogress/nprogress.css"; // progress bar style
import { ACCESS_TOKEN } from "@/store/mutation-types";

const whiteList = ["login"]; // no redirect whitelist

// 路由全局前置守卫,当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
// to: Route: 即将要进入的目标 路由对象;
// from: Route: 当前导航正要离开的路由;
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
router.beforeEach(async (to, from, next) => {
  //NProgress.start(); //进度条开始

  //判断token
  if (Vue.ls.get(ACCESS_TOKEN)) {
    // 即将要进入的路由

    if (to.path === "/user/login") {
      // 下一个要进入的路由

      next({ path: "/dashboard/workplace" });
      // NProgress.done();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch("GetInfo");

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch("GenerateRoutes", roles);

          // dynamically add accessible routes
          router.addRoutes(accessRoutes);

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next({ path: "/user/login" });
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({ path: "/user/login" });
      // NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
