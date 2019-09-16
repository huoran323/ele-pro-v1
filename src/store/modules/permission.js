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

// 遍历asyncRoutes动态路由，筛选符合后台返回权限的路由
function forSearchArr(route, roles) {
  let arrNew = [];
  for (let item of route) {
    let itemNew = { ...item }; //解决浅拷贝共享同一内存地址
    if (roles.includes(itemNew.name)) {
      if (itemNew.children) {
        itemNew.children = forSearchArr(itemNew.children, roles);
      }
      arrNew.push(itemNew);
    }
  }
  return arrNew;
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
    GenerateRoutesByEnd({ commit }, user_type) {
      return new Promise((resolve, reject) => {
        getRouteList({ user_type: user_type })
          .then(response => {
            let accessedRoutes = [];
            const { data } = response;

            accessedRoutes = forSearchArr(asyncRouterMap, data);
            commit("SET_ROUTERS", accessedRoutes);
            resolve(accessedRoutes);

            // commit("SET_ROUTERS", data);
            // resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取本地的route
    GenerateRoutes({ commit }, roleId) {
      return new Promise(resolve => {
        let accessedRoutes;
        if (roleId === "admin") {
          accessedRoutes = asyncRouterMap || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRouterMap, roleId);
        }
        commit("SET_ROUTERS", accessedRoutes);
        resolve(accessedRoutes);
      });
    }
  }
};

export default permission;
