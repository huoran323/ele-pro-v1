import { BasicLayout, RouteView, UserLayout, PageView } from "@/layouts";

export const asyncRouterMap = [
  {
    path: "/",
    name: "index",
    component: BasicLayout,
    meta: { title: "首页", roles: ["admin", "editor"] },
    redirect: "/dashboard/workplace",
    children: [
      //dashboard
      {
        path: "/dashboard",
        name: "dashboard",
        redirect: "/dashboard/workplace",
        component: RouteView,
        meta: {
          title: "仪表盘",
          keepAlive: true,
          icon: "el-icon-s-help",
          roles: ["admin", "editor"]
        },
        children: [
          {
            path: "/dashboard/workplace",
            name: "Workplace",
            component: () => import("@/views/dashboard/Workplace"),
            meta: {
              title: "工作台",
              keepAlive: true,
              roles: ["admin", "editor"]
            }
          }
        ]
      },
      // form
      {
        path: "/form",
        name: "form",
        redirect: "/form/base-form",
        component: PageView,
        meta: {
          title: "表单页",
          icon: "el-icon-info",
          roles: ["admin", "editor"]
        },
        children: [
          {
            path: "/form/base-form",
            name: "BaseForm",
            component: () => import("@/views/form/BasicForm"),
            meta: {
              title: "基础表单",
              roles: ["admin", "editor"]
            }
          }
        ]
      }
    ]
  }
];

export const constantRouterMap = [
  {
    path: "/user",
    component: UserLayout,
    redirect: "/user/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/user/Login")
      }
    ]
  }
];
