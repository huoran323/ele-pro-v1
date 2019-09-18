import { axios } from "@/utils/request";

export const getBasicList = parameter => {
  return axios({
    url: "/list/getBasicList",
    method: "get",
    params: parameter
  });
};

export const getPageList = parameter => {
  return axios({
    url: "/list/getPageList",
    method: "get",
    params: parameter
  });
};

export const getComplexList = parameter => {
  return axios({
    url: "/list/getComplexList",
    method: "get",
    params: parameter
  });
};
