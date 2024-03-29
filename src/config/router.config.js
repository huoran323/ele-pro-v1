import { BasicLayout, RouteView, UserLayout, PageView } from '@/layouts';

export const asyncRouterMap = [
           {
               path: '/',
               name: 'index',
               component: BasicLayout,
               meta: { title: 'home', roles: ['admin', 'editor'] },
               redirect: '/dashboard/analysis',
               children: [
                   // driver
                   {
                       path: '/driver',
                       name: 'Driver',
                       component: () => import('@/views/driver'),
                       meta: {
                           title: 'driver',
                           icon: 'el-icon-s-flag',
                       },
                   },
                   //dashboard
                   {
                       path: '/dashboard',
                       name: 'Dashboard',
                       redirect: '/dashboard/analysis',
                       component: RouteView,
                       meta: {
                           title: 'dashboard',
                           keepAlive: false,
                           icon: 'el-icon-s-help',
                           roles: ['admin', 'editor'],
                       },
                       children: [
                           {
                               path: '/dashboard/analysis',
                               name: 'Analysis',
                               component: () =>
                                   import('@/views/dashboard/Analysis'),
                               meta: {
                                   title: 'analysis',
                                   keepAlive: true,
                               },
                           },
                           {
                               path: '/dashboard/workplace',
                               name: 'Workplace',
                               component: () =>
                                   import('@/views/dashboard/Workplace'),
                               meta: {
                                   title: 'workplace',
                                   keepAlive: true,
                                   roles: ['admin', 'editor'],
                               },
                           },
                       ],
                   },
                   // form
                   {
                       path: '/form',
                       name: 'Form',
                       redirect: '/form/base-form',
                       component: PageView,
                       meta: {
                           title: 'form',
                           icon: 'el-icon-info',
                           roles: ['admin', 'editor'],
                       },
                       children: [
                           {
                               path: '/form/base-form',
                               name: 'BaseForm',
                               component: () =>
                                   import('@/views/form/BasicForm'),
                               meta: {
                                   title: 'baseform',
                                   roles: ['admin', 'editor'],
                               },
                           },
                           {
                               path: '/form/news-form',
                               name: 'NewsForm',
                               component: () =>
                                   import('@/views/form/NewsForm'),
                               meta: {
                                   title: 'newsform',
                                   roles: ['admin', 'editor'],
                               },
                           },
                           {
                               path: '/form/excel-form',
                               name: 'ExcelForm',
                               component: () =>
                                   import('@/views/form/ExcelForm'),
                               meta: {
                                   title: 'excelform',
                                   roles: ['admin', 'editor'],
                               },
                           },
                       ],
                   },
                   // list
                   {
                       path: '/list',
                       name: 'List',
                       component: PageView,
                       redirect: '/list/table-list',
                       meta: { title: 'list', icon: 'el-icon-tickets' },
                       children: [
                           {
                               path: '/list/table-list',
                               name: 'TableListWrapper',
                               hideChildrenInMenu: true,
                               component: () =>
                                   import('@/views/list/TableList'),
                               meta: {
                                   title: 'tablelistwrapper',
                                   keepAlive: true,
                               },
                           },
                           {
                               path: '/list/table-complex',
                               name: 'TableListComplex',
                               component: () =>
                                   import('@/views/list/TableComplex'),
                               meta: {
                                   title: 'tablelistcomplex',
                                   keepAlive: false,
                               },
                           },
                           {
                               path: '/list/table-nesting',
                               name: 'TableListNesting',
                               component: () =>
                                   import('@/views/list/TableNesting'),
                               meta: {
                                   title: 'tablelistnesting',
                                   keepAlive: false,
                               },
                           },
                           {
                               path: '/list/testList',
                               name: 'TableListTesting',
                               component: () =>
                                   import('@/views/list/TableTesting'),
                               meta: {
                                   title: 'tablelisttesting',
                                   keepAlive: false,
                               },
                           },
                       ],
                   },
                   {
                       path: '/test',
                       name: 'TestBMap',
                       component: PageView,
                       redirect: '/test/bmap',
                       meta: {
                           title: 'testBmap',
                           icon: 'el-icon-lollipop',
                       },
                       children: [
                           {
                               path: '/test/bmap',
                               name: 'BMap',
                               component: () =>
                                   import(/* webpackChunkName: "fail" */ '@/views/test/bMap'),
                               meta: { title: 'bMap' },
                           },
                       ],
                   },
                   {
                       path: '/exception',
                       name: 'Exception',
                       component: RouteView,
                       redirect: '/exception/404',
                       meta: {
                           title: 'exception',
                           icon: 'el-icon-lollipop',
                       },
                       children: [
                           {
                               path: '/exception/404',
                               name: 'Exception404',
                               component: () =>
                                   import(/* webpackChunkName: "fail" */ '@/views/exceptions/404'),
                               meta: { title: 'exception404' },
                           },
                       ],
                   },
               ],
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
               path: '*',
               redirect: '/404',
               // hidden: true
           },
       ];

export const constantRouterMap = [
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/user/Login'),
            },
        ],
    },
    {
        path: '/404',
        component: () =>
            import(/* webpackChunkName: "fail" */ '@/views/exceptions/404'),
    },
];
