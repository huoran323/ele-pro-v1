import '@babel/polyfill';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n/i18n';
import { VueAxios } from './utils/request';

import '@/styles/index.less';
import '../theme/index.css';

// mock
// import "./mock";

import './core/use'; // 引入配置
import './permission'; // permission control
import './utils/filter'; // global filter

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(VueAxios);

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
