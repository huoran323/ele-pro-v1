import Vue from "vue";

import { login, getInfo, logout } from "@/api/login";
import { ACCESS_TOKEN } from "@/store/mutation-types";

const user = {
  state: {
    token: "",
    roles: []
  },
  mutations: {
    // 存储token
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.result;

            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
            commit("SET_TOKEN", result.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const { result } = response;
            const { roles } = result;

            commit("SET_ROLES", roles);
            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        Vue.ls.remove(ACCESS_TOKEN);

        logout(state.token)
          .then(() => {
            resolve();
          })
          .catch(() => {
            resolve();
          });
      });
    },

    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        Vue.ls.remove(ACCESS_TOKEN);
        resolve();
      });
    }
  }
};

export default user;
