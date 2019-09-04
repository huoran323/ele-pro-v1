import { axios } from "@/utils/request";

export const login = parameter => {
  return axios({
    url: "/auth/login",
    method: "post",
    data: parameter
  });
};

export const getInfo = () => {
  return axios({
    url: "/user/info",
    method: "get"
  });
};

export const getRouteList = parameter => {
  return axios({
    url: "/user/routelist",
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
