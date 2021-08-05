<template>
    <div>
        <div style="width: 100%; height: 400px">
            <hot-table
                :settings="hotSettings"
                ref="hotTableComponent"
            ></hot-table>
        </div>

        <el-button @click="save()" type="primary">保存</el-button>
    </div>
</template>
<script>
const hotData = [
    {
        id: '1',
        name: '中远甲线',
        name2: '中心变电所',
        data: 10,
    },
    {
        id: '1',
        name: '中远甲线',
        name2: '中心变电所',
        data: 10,
    },
    {
        id: '1',
        name: '中远甲线',
        name2: '中心变电所',
        data: 10,
    },
    {
        id: '1',
        name: '中远甲线',
        name2: '中心变电所',
        data: 10,
    },
];
import { HotTable } from '@handsontable/vue';
import 'handsontable/dist/handsontable.full.css';
export default {
    name: 'ExcelForm',
    components: { HotTable },
    data() {
        return {
            description: '用于在Vue中使用Excel基础功能',
            hotSettings: {
                licenseKey: 'non-commercial-and-evaluation',
                width: '100%',
                height: '100%',
                // 水平和垂直对齐 可用类名： 水平： htLeft, htCenter, htRight, htJustify; 垂直：htTop、htMiddle、htBottom
                className: 'htCenter htMiddle',
                fillHandle: true, // 可以在水平和垂直方向自动填充值，类似于excel表格的数据增加操作,
                data: hotData,
                columns: function(column) {
                    let columnMeta = {};
                    if (column === 0) {
                        columnMeta.data = 'name';
                    } else if (column === 1) {
                        columnMeta.data = 'name2';
                    } else if (column == 2) {
                        columnMeta.data = 'data';
                    }
                    return columnMeta;
                },
                // data: [
                //     ['中远甲线', '中心变电所', 10,],
                //     ['中远甲线', '中心变电所', 20,],
                //     ['中远乙线', '中心变电所', 20,],
                //     ['中远乙线', '中心变电所', 20,],
                //     ['中远乙线', '中心变电所', 20,],
                // ],
                mergeCells: [
                    // 第0行 第0列 合并2行数据
                    { row: 0, col: 0, rowspan: 2, colspan: 1 },
                    // 第2行 第0列 合并3行数据
                    { row: 2, col: 0, rowspan: 2, colspan: 1 },
                ],
                rowHeaders: true,
                rowHeights: 35,
                colWidths: [100, 120, 80],
                colHeaders: ['线路', '变电所名称', '开关编号'],
                contextMenu: {
                    items: {
                        row_above: {
                            name: '在上方插入行',
                        },
                        row_below: {
                            name: '在下方插入行',
                        },
                        col_left: {
                            name: '在左侧插入列',
                        },
                        col_right: {
                            name: '在右侧插入列',
                        },
                        mergeCells: {
                            name: '合并取消单元格',
                        },
                        hsep1: '---------', //提供分隔线
                        remove_row: {
                            name: '删除行',
                        },
                        remove_col: {
                            name: '删除列',
                        },
                        hsep2: '---------',
                    },
                },
            },
        };
    },
    methods: {
        save() {
            console.log('hot-datas: ', this.hotSettings.data);
        },
    },
};
</script>
<style>
/* .wtHolder {
    width: 100% !important;
    height: 100% !important;
} */
</style>
