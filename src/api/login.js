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

export const logout = () => {
  return axios({
    url: "/auth/logout",
    method: "post"
  });
};
