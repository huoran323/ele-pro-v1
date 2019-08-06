import Mock from "mockjs";
import { builder } from "../util";

const getRouteList = () => {
  return builder(
    [
      {
        path: "/",
        title: "首页",
        roles: [],
        children: [
          {
            path: "/dashboard",
            title: "仪表盘",
            roles: [],
            children: [
              {
                path: "/dashboard/analysis",
                title: "分析页",
                roles: [],
                children: []
              },
              {
                path: "/dashboard/workplace",
                title: "工作台",
                roles: []
              }
            ]
          },
          {
            path: "/form",
            title: "表单页",
            roles: [],
            children: [
              {
                path: "/form/base-form",
                title: "基础表单",
                roles: []
              }
            ]
          }
        ]
      },
      {
        path: "/exception/404",
        title: ""
      }
    ],
    "请求成功",
    200
  );
};

Mock.mock(/\/api\/user\/routelist/, "get", getRouteList);
