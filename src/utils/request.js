import Vue from "vue";
import axios from "axios";
import store from "@/store";
import Qs from "qs";
import { VueAxios } from "./axios";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import { Notification, Loading } from "element-ui";

// 在全局请求和响应拦截器中添加请求状态
let loading = null;

// 创建 axios 实例
const service = axios.create({
  // baseURL: "/api",
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000, //请求超时时间
  responseType: "json",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    // "Content-Type": "application/json"
  }
});

const err = error => {
  if (loading) {
    loading.close();
  }
  if (error.response) {
    const data = error.response.data;
    const token = Vue.ls.get(ACCESS_TOKEN);
    if (error.response.status === 403) {
      Notification.error({
        title: "Forbidden",
        message: data.message
      });
    }
    if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
      Notification.error({
        title: "Unauthorized",
        message: "Authorization verification failed"
      });
      if (token) {
        store.dispatch("Logout").then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      }
    }
  }
  return Promise.reject(error);
};

// 请求拦截器
service.interceptors.request.use(config => {
  loading = Loading.service({ text: "拼命加载中" });
  const token = Vue.ls.get(ACCESS_TOKEN);

  if (token) {
    config.headers["token"] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  config.data = Qs.stringify(config.data);
  // config.data = qs.stringify(config.data, {
  //   arrayFormat: "indices",
  //   allowDots: true
  // });

  return config;
}, err);

// response interceptor
// 响应拦截器
service.interceptors.response.use(response => {
  if (loading) {
    loading.close();
  }
  switch (response.data.code) {
    // 请求成功
    case 200:
      // Notification.success({
      //   title: "",
      //   message: response.data.message
      // });

      return response.data;

    default:
      return "";
  }
}, err);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service);
  }
};

export { installer as VueAxios, service as axios };
