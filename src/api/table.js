import { axios } from "@/utils/request";

export const getBasicList = () => {
  return axios({
    url: "/table/getBasicList",
    method: "get"
  });
};

export const getPageList = parameter => {
  return axios({
    url: "/table/getPageList",
    method: "post",
    data: parameter
  });
};

export const getComplexList = () => {
  return axios({
    url: "/table/getComplexList",
    method: "get"
  });
};
