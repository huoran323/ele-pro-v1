import Vue from "vue";

import { login, getInfo, logout } from "@/api/login";
import { ACCESS_TOKEN } from "@/store/mutation-types";

const user = {
  state: {
    // token
    token: "",
    // 用户名称
    name: "",
    // 用户头像
    avatar: "",
    user_type: "",
    userInfo: {}
  },
  mutations: {
    // 存储token
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERTYPE: (state, user_type) => {
      state.user_type = user_type;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_INFO: (state, info) => {
      state.userInfo = info;
    }
  },
  actions: {
    Login({ commit, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(res => {
            // const result = res.result;

            // Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
            // commit("SET_TOKEN", result.token);

            Vue.ls.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000);
            commit("SET_TOKEN", res.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit }, user_type) {
      return new Promise((resolve, reject) => {

        getInfo({user_type: user_type})
          .then(response => {

            const { data } = response;
            const { user_type } = data;

            commit("SET_USERTYPE", user_type);
            commit("SET_NAME", data.name);
            commit("SET_AVATAR", data.avatar);
            commit("SET_INFO", data);
            resolve(data);
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
        commit("SET_USERTYPE", "");
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
        commit("SET_USERTYPE", "");
        Vue.ls.remove(USER_TYPE);
        resolve();
      });
    }
  }
};

export default user;
