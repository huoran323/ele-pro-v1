import { axios } from "@/utils/request";

export const login = parameter => {
  return axios({
    url: "/user/login",
    method: "post",
    data: parameter
  });
};

export const getInfo = parameter => {
  return axios({
    url: "/user/getUserInfo",
    method: "post",
    data: parameter
  });
};

export const getRouteList = parameter => {
  return axios({
    url: "/user/getRouteList",
    method: "post",
    data: parameter
  });
};

export const logout = () => {
  return axios({
    url: "/auth/logout",
    method: "post"
  });
};
