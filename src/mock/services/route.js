import Mock from "mockjs";
import { builder, getBody } from "../util";

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
          }
        ]
      }
    ],
    "请求成功",
    200
  );
};

Mock.mock(/\/api\/user\/routelist/, "get", getRouteList);
