import Vue from "vue";

import { login } from "@/api/login";
import { ACCESS_TOKEN } from "@/store/mutation-types";

const user = {
  state: {
    token: ""
  },
  mutations: {
    // 存储token
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.result;
            Vue.ls.set(ACCESS_TOKEN, result.toekn, 7 * 24 * 60 * 60 * 1000);
            commit("SET_TOKEN", result.toekn);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;
