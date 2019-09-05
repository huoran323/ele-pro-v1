import Qs from "qs";

const VueAxios = {
  vm: {},
  // eslint-disable-next-line no-unused-vars
  install(Vue, instance) {
    if (this.installed) {
      return;
    }
    this.installed = true;

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error("You have to install axios");
      return;
    }

    Vue.axios = instance;

    // 通过 Object.defineProperties 为 VNode 的原型绑定了对象 axios,$http
    Object.defineProperties(Vue.prototype, {
      axios: {
        get: function get() {
          return instance;
        }
      },
      $http: {
        get: function get() {
          return instance;
        }
        // post: function post(parameter) {
        //   instance.data = Qs.stringify(parameter);
        //   return instance;
        // }
      }
    });
  }
};

export { VueAxios };
