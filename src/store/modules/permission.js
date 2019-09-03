import Vue from "vue";

import { getRouteList } from "@/api/login";
import { constantRouterMap, asyncRouterMap } from "@/config/router.config";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

// 筛选符合权限的路由
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

// 筛选本地route中含有后台返回的route权限
export function hasRoute(requestList, filterRoute) {
  return requestList.some(item => item.path == filterRoute.path);
}

//把子数组拆分到同一级中
const routeLists = [];
export function splitRoutes(routes) {
  routes.map(list => {
    if (list.children) {
      splitRoutes(list.children);
    }
    // routeLists.unshift({ path: list.path });
    routeLists.unshift({ ...list });
  });

  return routeLists;
}

// 将本地中含有后台返回的route放进新的route数组
export function filterAsyncRouteList(children) {
  const res = [];

  children.forEach(route => {
    if (hasRoute(routeLists, route)) {
      if (route.children) {
        route.children = filterAsyncRouteList(route.children);
      }
      res.push(route);
    }
  });
  return res;
}

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
    // 异步获取从后台返回的route数据
    GenerateRoutesByEnd({ commit }, roles) {
      return new Promise((resolve, reject) => {
        getRouteList()
          .then(response => {
            let accessedRoutes;
            const { result } = response;
            splitRoutes(result);
            accessedRoutes = filterAsyncRouteList(asyncRouterMap);
            commit("SET_ROUTERS", accessedRoutes);

            resolve(accessedRoutes);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取本地的route
    GenerateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes;
        if (roles.includes("admin")) {
          accessedRoutes = asyncRouterMap || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRouterMap, roles);
        }
        commit("SET_ROUTERS", accessedRoutes);
        resolve(accessedRoutes);
      });
    }
  }
};

export default permission;
