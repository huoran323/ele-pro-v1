import { axios } from "@/utils/request";

//图片上传
export const upload = parameter => {
  return axios({
    url: "/news/upload/single",
    method: "post",
    data: parameter,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
