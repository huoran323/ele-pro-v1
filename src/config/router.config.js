import { BasicLayout, RouteView, UserLayout } from "@/layouts";

export const asyncRouterMap = [
  {
    path: "/",
    name: "index",
    component: BasicLayout,
    meta: { title: "首页" },
    redirect: "/dashboard/workplace",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        redirect: "/dashboard/workplace",
        component: RouteView,
        meta: { title: "仪表盘", keepAlive: true },
        children: [
          {
            path: "/dashboard/workplace",
            name: "Workplace",
            component: () => import("@/views/dashboard/Workplace"),
            meta: {
              title: "工作台",
              keepAlive: true
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
