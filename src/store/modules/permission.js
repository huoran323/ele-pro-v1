import { constantRouterMap, asyncRouterMap } from "@/config/router.config";

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
const hasPermission = (permission, route) => {
  if (route.meta && route.meta.permission) {
    let flag = false;
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i]);
      if (flag) {
        return true;
      }
    }
    return false;
  }
  return true;
};

// 筛选符合权限的路由
// const filterAsyncRouter = (routerMap, roles) => {
//   const accessedRouters = routerMap.filter(route => {
//     if (hasPermission(roles.permissionList, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles);
//       }
//       return true;
//     }
//     return false;
//   });
//   return accessedRouters;
// };

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // const { roles } = data; //从permission.js中分发过来的角色参数
        // const accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        commit("SET_ROUTERS", asyncRouterMap);
        resolve();
      });
    }
  }
};

export default permission;
