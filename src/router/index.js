import Router from "vue-router";
import { constantRouterMap } from "@/config/router.config";

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
