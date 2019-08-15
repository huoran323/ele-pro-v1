import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import permission from "./modules/permission";
import loading from "./modules/loading";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    permission,
    loading
  },
  state: {},
  mutations: {},
  actions: {},
  getters
});
