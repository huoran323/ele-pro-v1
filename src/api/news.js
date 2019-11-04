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

//新闻保存
export const saveNews = parameter => {
  return axios({
    url: "/news/save",
    method: "post",
    data: parameter
  });
};

export const getNewsList = parameter => {
  return axios({
    url: "/news/getNewsList",
    method: "post",
    data: parameter
  });
};
