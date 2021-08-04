/*
 * @Author: your name
 * @Date: 2019-10-28 09:03:24
 * @LastEditTime: 2021-05-24 15:10:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ele-pro-v1/src/main.js
 */
import '@babel/polyfill';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n/i18n';
import { VueAxios } from './utils/request';

// import './styles/element-variables.scss';
import '@/styles/index.less';

// mock
// import "./mock";

import './core/use'; // 引入配置
import './permission'; // permission control
import './utils/filter'; // global filter

// 测试百度地图
// import VueBMap from 'vue-bmap-gl';
// import 'vue-bmap-gl/dist/style.css';
// import VueMapvgl from 'vue-mapvgl';

// 测试高德地图
import VueAMap from 'vue-amap';

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(VueAxios);

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: 'd8558223770a787080eed2f8d8cdc225',
    plugin: [
        'AMap.Autocomplete',
        'AMap.PlaceSearch',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.ToolBar',
        'AMap.MapType',
        'AMap.PolyEditor',
        'AMap.CircleEditor',
    ],
    uiVersion: '1.0.11',
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.15',
});

// 测试百度地图
// Vue.use(VueBMap);
// Vue.use(VueMapvgl);
// VueBMap.initBMapApiLoader({
//     ak: '4LacGZ3TZjcgmqdBqGN5fUK9jxP7y1KC',
//     v: '1.0',
// });

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
