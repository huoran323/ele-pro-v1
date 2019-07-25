import { axios } from "@/utils/request";

export const login = parameter => {
  return axios({
    url: "/auth/login",
    method: "post",
    data: parameter
  });
};
