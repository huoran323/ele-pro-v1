/*
 * @Author: your name
 * @Date: 2020-06-05 09:13:27
 * @LastEditTime: 2021-04-13 12:39:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /ele-pro-v1/src/store/modules/settings.js
 */
import variables from '@/styles/element-variables.scss';

const settings = {
    state: {
        theme: variables.theme,
    },
    mutations: {
        CHANGE_SETTING: (state, { key, value }) => {
            console.log('CHANGE_SETTING', key, value);
            if (state.hasOwnProperty(key)) {
                state[key] = value;
            }
        },
    },
    actions: {
        changeSetting({ commit }, data) {
            commit('CHANGE_SETTING', data);
        },
    },
};

export default settings;
