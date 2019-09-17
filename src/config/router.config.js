import { BasicLayout, RouteView, UserLayout, PageView } from "@/layouts";

export const asyncRouterMap = [
  {
    path: "/",
    name: "index",
    component: BasicLayout,
    meta: { title: "首页", roles: ["admin", "editor"] },
    redirect: "/dashboard/analysis",
    children: [
      // driver
      {
        path: "/driver",
        name: "Driver",
        component: () => import("@/views/driver"),
        meta: {
          title: "driver",
          icon: "el-icon-s-flag"
        }
      },
      //dashboard
      {
        path: "/dashboard",
        name: "Dashboard",
        redirect: "/dashboard/analysis",
        component: RouteView,
        meta: {
          title: "dashboard",
          keepAlive: false,
          icon: "el-icon-s-help",
          roles: ["admin", "editor"]
        },
        children: [
          {
            path: "/dashboard/analysis",
            name: "Analysis",
            component: () => import("@/views/dashboard/Analysis"),
            meta: { title: "分析页", keepAlive: true }
          },
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
        name: "Form",
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
      },
      // list
      {
        path: "/list",
        name: "List",
        component: PageView,
        redirect: "/list/table-list",
        meta: { title: "列表页", icon: "el-icon-tickets" },
        children: [
          {
            path: "/list/table-list",
            name: "TableListWrapper",
            hideChildrenInMenu: true,
            component: () => import("@/views/list/TableList"),
            meta: { title: "普通表格", keepAlive: true }
          },
          {
            path: "/list/table-complex",
            name: "TableListComplex",
            component: () => import("@/views/list/TableComplex"),
            meta: { title: "复杂表格", keepAlive: false }
          }
        ]
      },
      {
        path: "/exception",
        name: "Exception",
        component: RouteView,
        redirect: "/exception/404",
        meta: { title: "异常页", icon: "el-icon-lollipop" },
        children: [
          {
            path: "/exception/404",
            name: "Exception404",
            component: () =>
              import(/* webpackChunkName: "fail" */ "@/views/exceptions/404"),
            meta: { title: "404" }
          }
        ]
      }
    ]
  },
  // {
  //   path: "/user",
  //   component: UserLayout,
  //   redirect: "/user/login",
  //   hidden: true,
  //   children: [
  //     {
  //       path: "login",
  //       name: "login",
  //       component: () => import("@/views/user/Login")
  //     }
  //   ]
  // },
  {
    path: "*",
    redirect: "/404"
    // hidden: true
  }
];

// 第二种写法
// export const asyncRouterMap = [
//   //dashboard
//   {
//     path: "/dashboard",
//     name: "dashboard",
//     redirect: "/dashboard/analysis",
//     component: BasicLayout,
//     meta: {
//       title: "仪表盘",
//       keepAlive: true,
//       icon: "el-icon-s-help",
//       roles: ["admin", "editor"]
//     },
//     children: [
//       {
//         path: "/dashboard/analysis",
//         name: "Analysis",
//         component: () => import("@/views/dashboard/Analysis"),
//         meta: { title: "分析页", keepAlive: false }
//       },
//       {
//         path: "/dashboard/workplace",
//         name: "Workplace",
//         component: () => import("@/views/dashboard/Workplace"),
//         meta: {
//           title: "工作台",
//           keepAlive: true,
//           roles: ["admin", "editor"]
//         }
//       }
//     ]
//   },
//   // form
//   {
//     path: "/form",
//     name: "form",
//     redirect: "/form/base-form",
//     component: BasicLayout,
//     meta: {
//       title: "表单页",
//       icon: "el-icon-info",
//       roles: ["admin", "editor"]
//     },
//     children: [
//       {
//         path: "/form/base-form",
//         name: "BaseForm",
//         component: () => import("@/views/form/BasicForm"),
//         meta: {
//           title: "基础表单",
//           roles: ["admin", "editor"]
//         }
//       }
//     ]
//   },
//   {
//     path: "/exception",
//     name: "exception",
//     component: BasicLayout,
//     redirect: "/exception/404",
//     meta: { title: "异常页" },
//     children: [
//       {
//         path: "/exception/404",
//         name: "Exception404",
//         component: () =>
//           import(/* webpackChunkName: "fail" */ "@/views/exceptions/404"),
//         meta: { title: "404" }
//       }
//     ]
//   }
//   // {
//   //   path: "*",
//   //   redirect: "/404",
//   //   component: () =>
//   //     import(/* webpackChunkName: "fail" */ "@/views/exceptions/404")
//   //   // hidden: true
//   // }
// ];

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
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/exceptions/404")
  }
];
