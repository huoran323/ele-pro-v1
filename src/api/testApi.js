import { axios } from '@/utils/request';

export const getUserMenu = (parameter) => {
    return axios({
        url: '/user/getUserMenu',
        method: 'post',
        data: parameter,
    });
};

export const getTableList = (parameter) => {
    return axios({
        url: '/test/getTableList',
        method: 'post',
        data: parameter,
    });
};

export const getTableData = (parameter) => {
    return axios({
        url: '/test/getTableData',
        method: 'post',
        data: parameter,
    });
};

export const getDialogData = (parameter) => {
    return axios({
        url: '/test/getDialogData',
        method: 'post',
        data: parameter,
    });
};

export const getDeviceData = (parameter) => {
    return axios({
        url: '/test/getDeviceData',
        method: 'post',
        data: parameter,
    });
};

export const getLevelData = (parameter) => {
    return axios({
        url: '/test/getLevelData',
        method: 'post',
        data: parameter,
    });
};

export const getDeviceTypeData = (parameter) => {
    return axios({
        url: '/test/getDeviceTypeData',
        method: 'post',
        data: parameter,
    });
};

export const getFactoryData = (parameter) => {
    return axios({
        url: '/test/getFactoryData',
        method: 'post',
        data: parameter,
    });
};
