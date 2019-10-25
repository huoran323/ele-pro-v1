import { axios } from "@/utils/request";

export const getUserMenu = parameter => {
  return axios({
    url: "/user/getUserMenu",
    method: "post",
    data: parameter
  });
};