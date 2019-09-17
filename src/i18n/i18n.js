import Vue from "vue";
import locale from "element-ui/lib/locale";
import messages from "./langs/index";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: localStorage.lang || "cn",
  messages
  //   silentTranslationWarn: true
});

locale.i18n((key, value) => i18n.t(key, value));
export default i18n;

// import Vue from "vue";
// import VueI18n from "vue-i18n";
// import messages from "./langs";

// Vue.use(VueI18n);
// const i18n = new VueI18n({
//   locale: localStorage.lang || "cn",
//   messages
// });

// export default i18n;
