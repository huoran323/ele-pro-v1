<template>
    <div>
        <el-button type="primary" @click="addNew()">新增</el-button>
        <el-table :data="tableData" border>
            <template v-for="(item, index) in columns">
                <template v-if="item.prop == 'action'">
                    <el-table-column
                        label="操作"
                        width="250"
                        align="center"
                        :key="index"
                    >
                        <template>
                            <el-button type="primary" size="medium"
                                >编辑</el-button
                            >
                            <el-button type="warning" size="medium"
                                >审核</el-button
                            >
                        </template>
                    </el-table-column>
                </template>
                <template v-else>
                    <el-table-column
                        :prop="item.prop"
                        :label="item.column"
                        align="center"
                        :key="index"
                    ></el-table-column>
                </template>
            </template>
        </el-table>

        <el-dialog title="新增" width="65%" :visible.sync="dialogVisible">
            <formCreate
                v-model="fApi"
                :rule="rule"
                @on-submit="onSubmit"
            ></formCreate
        ></el-dialog>
    </div>
</template>
<script>
import formCreate from '@form-create/element-ui';
import * as api from '@/api/testApi';
export default {
    components: {
        formCreate: formCreate.$form(),
    },
    data() {
        return {
            columns: [], //表头
            tableData: [], //数据
            dialogVisible: false,
            fApi: {},
            rule: [],
        };
    },
    mounted() {
        this.getTableList();
    },
    methods: {
        getTableList() {
            api.getTableList().then((res) => {
                this.columns = res.data;
                this.getTableData();
            });
        },
        getTableData() {
            api.getTableData().then((res) => {
                this.tableData = res.data;
            });
        },
        //新增
        addNew() {
            this.dialogVisible = true;
            api.getDialogData().then((res) => {
                console.log(res);
                this.rule = [];
                res.data.forEach((item) => {
                    let obj = {};
                    obj.type = item.type;
                    obj.field = item.field;
                    obj.title = item.name;
                    obj.value = item.value;
                    obj.pid = item.pid;
                    obj.options = [];
                    this.rule.push(obj);
                });
                this.rule.forEach(async (ktem) => {
                    if (ktem.type == 'select' && ktem.pid === 'null') {
                        let data1 = await this.getSelectData(ktem.field);
                        let tempArr = [];
                        data1.forEach((jtem) => {
                            let obj2 = {};
                            obj2.value = jtem.value;
                            obj2.label = jtem.name;
                            tempArr.push(obj2);
                        });
                        ktem.options = tempArr;
                        ktem.inject = true;
                        ktem.on = {
                            change: this.change,
                        };
                    }
                });
            });
        },
        change(inject) {
            let rule = inject.rule;
            if (rule.length) {
                rule.forEach(async (item, index) => {
                    if (item.pid == inject.self.field) {
                        let data1 = await this.getSelectData(item.field);
                        let tempArr = [];
                        data1.forEach((item) => {
                            let obj = {};
                            obj.value = item.value;
                            obj.label = item.name;
                            tempArr.push(obj);
                        });
                        item.options = tempArr;
                        item.inject = true;
                        item.on = {
                            change: this.change,
                        };
                    }
                });
                this.resetVal(inject.self.field, rule);
            }
        },
        resetVal(pId, arr) {
            arr.forEach((item) => {
                if (item.pid == pId) {
                    this.$set(item, 'value', '');
                    this.$set(item, 'options', []);
                    this.resetVal(item.field, arr);
                }
            });
        },
        getSelectData(type) {
            if (type == 'device') {
                return new Promise((resolve) => {
                    api.getDeviceData().then((res) => {
                        resolve(res.data);
                    });
                });
            } else if (type == 'level') {
                return new Promise((resolve) => {
                    api.getLevelData().then((res) => {
                        resolve(res.data);
                    });
                });
            } else if (type == 'device_type') {
                return new Promise((resolve) => {
                    api.getDeviceTypeData().then((res) => {
                        resolve(res.data);
                    });
                });
            } else if (type == 'factory') {
                return new Promise((resolve) => {
                    api.getFactoryData().then((res) => {
                        resolve(res.data);
                    });
                });
            }
        },
        onSubmit(formData) {
            console.log('onSubmit: ', formData);
        },
    },
};
</script>
<style lang="scss"></style>
