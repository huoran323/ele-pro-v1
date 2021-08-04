<template>
    <div class="page-header-index-wide">
        <el-row :gutter="24" style="margin: 0">
            <el-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <chart-card title="总销售额" total="¥126,560">
                    <el-tooltip
                        content="指标说明"
                        slot="action"
                        placement="top"
                    >
                        <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                    <div>
                        <trend flag="top" style="margin-right: 16px">
                            <span slot="term">周同比</span>
                            12%
                        </trend>
                        <trend flag="bottom">
                            <span slot="term">日同比</span>
                            11%
                        </trend>
                    </div>
                    <template slot="footer">
                        日均销售额
                        <span>￥ 234.56</span>
                    </template>
                </chart-card>
            </el-col>
            <el-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <chart-card title="访问量" :total="8846 | NumberFormat">
                    <el-tooltip
                        content="指标说明"
                        slot="action"
                        placement="top"
                    >
                        <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                    <div>
                        <mini-area />
                    </div>
                    <template slot="footer">
                        日访问量
                        <span>{{ '1234' | NumberFormat }}</span>
                    </template>
                </chart-card>
            </el-col>
            <el-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <chart-card title="支付笔数" :total="6560 | NumberFormat">
                    <el-tooltip
                        content="指标说明"
                        slot="action"
                        placement="top"
                    >
                        <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                    <div>
                        <mini-bar />
                    </div>
                    <template slot="footer">
                        转化率
                        <span>60%</span>
                    </template>
                </chart-card>
            </el-col>
            <el-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
                <chart-card title="运营活动效果" total="78%">
                    <el-tooltip
                        content="指标说明"
                        slot="action"
                        placement="top"
                    >
                        <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                    <div>
                        <mini-progress />
                    </div>
                    <template slot="footer">
                        <trend flag="bottom" style="margin-right: 16px;">
                            <span slot="term">同周比</span>12%
                        </trend>
                        <trend flag="top">
                            <span slot="term">日环比</span>80%
                        </trend>
                    </template>
                </chart-card>
            </el-col>
        </el-row>

        <el-card style="margin: 0px 12px 0px">
            <div>
                <div class="extra-wrapper">
                    <div class="extra-item">
                        <a>{{ $t('analysis.today') }}</a>
                        <a>{{ $t('analysis.week') }}</a>
                        <a>{{ $t('analysis.month') }}</a>
                        <a>{{ $t('analysis.year') }}</a>
                    </div>
                    <el-date-picker
                        size="small"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width: 250px"
                    ></el-date-picker>
                </div>
                <el-tabs v-model="tabItem">
                    <el-tab-pane
                        :label="$t('analysis.sales')"
                        name="tab1"
                        :lazy="true"
                    >
                        <el-row :gutter="24">
                            <el-col :xl="16" :md="12" :sm="24">
                                <bar
                                    title="销售额排行"
                                    v-if="'tab1' === tabItem"
                                />
                            </el-col>
                            <el-col :xl="8" :md="12" :sm="24">
                                <rank-list
                                    title="门店销售排行榜"
                                    :list="rankList1"
                                />
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="访问量" name="tab2" :lazy="true">
                        <el-row :gutter="24">
                            <el-col :xl="16" :md="12" :sm="24">
                                <bar
                                    title="销售额趋势"
                                    v-if="'tab2' === tabItem"
                                />
                            </el-col>
                            <el-col :xl="8" :md="12" :sm="24">
                                <rank-list
                                    title="门店销售排行榜"
                                    :list="rankList2"
                                />
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>

        <el-row :gutter="24" style="margin: 0px ">
            <el-col :sm="24" :md="12" :xl="12">
                <el-card
                    :style="{
                        marginTop: '24px',
                        minHeight: '500px',
                        marginBottom: '24px',
                    }"
                >
                    <div slot="header">
                        <span>线上热门搜索</span>
                    </div>
                    <el-row :gutter="68">
                        <el-col
                            :xs="24"
                            :sm="12"
                            :style="{ marginBottom: ' 24px' }"
                        >
                            <number-info :total="12321" :subTotal="17.1">
                                <span slot="subtitle">
                                    <span>搜索用户数</span>
                                    <el-tooltip
                                        style="margin-left: 10px"
                                        content="指标说明"
                                        slot="action"
                                        placement="top"
                                    >
                                        <i class="el-icon-warning-outline"></i>
                                    </el-tooltip>
                                </span>
                            </number-info>
                            <div>
                                <mini-area :style="{ height: '45px' }" />
                            </div>
                        </el-col>
                        <el-col
                            :xs="24"
                            :sm="12"
                            :style="{ marginBottom: ' 24px' }"
                        >
                            <number-info
                                :total="2.7"
                                :subTotal="26.2"
                                flag="bottom"
                            >
                                <span slot="subtitle">
                                    <span>人均搜索次数</span>
                                    <el-tooltip
                                        style="margin-left: 10px"
                                        content="指标说明"
                                        slot="action"
                                        placement="top"
                                    >
                                        <i class="el-icon-warning-outline"></i>
                                    </el-tooltip>
                                </span>
                            </number-info>
                            <div>
                                <mini-area :style="{ height: '45px' }" />
                            </div>
                        </el-col>
                    </el-row>
                    <div class="el-table-wrapper">
                        <el-table
                            :data="searchData"
                            :border="true"
                            style="margin-top: 8px"
                        >
                            <el-table-column
                                label="排名"
                                prop="index"
                            ></el-table-column>
                            <el-table-column
                                label="搜索关键词"
                                prop="keyword"
                            ></el-table-column>
                            <el-table-column
                                label="用户数"
                                prop="count"
                            ></el-table-column>
                            <el-table-column
                                label="周涨幅"
                                prop="range"
                                sortable
                            >
                                <template slot-scope="scope">
                                    <trend
                                        :flag="
                                            scope.row.status === 0
                                                ? 'top'
                                                : 'bottom'
                                        "
                                        style="margin-right: 16px"
                                    >
                                        <span slot="term"
                                            >{{ scope.row.range }}%</span
                                        >
                                    </trend>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="1"
                            :page-size="5"
                            background
                            layout=" prev, pager, next"
                            :total="50"
                            style="float: right; margin-top: 10px; margin-bottom: 10px"
                        ></el-pagination>
                    </div>
                </el-card>
            </el-col>
            <el-col :sm="24" :md="12" :xl="12">
                <el-card
                    :style="{
                        marginTop: '24px',
                        minHeight: '568px',
                        marginBottom: '24px',
                    }"
                >
                    <div slot="header">
                        <span>销售额类别占比</span>
                        <el-radio-group
                            v-model="radio1"
                            :style="{ float: 'right', marginTop: '-9px' }"
                        >
                            <el-radio-button label="全部渠道"></el-radio-button>
                            <el-radio-button label="线上"></el-radio-button>
                            <el-radio-button label="门店"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <h4>销售额</h4>
                    <div>
                        <pie />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    Trend,
    Bar,
    Pie,
    RankList,
    NumberInfo,
} from '@/components';

const rankList1 = [];
for (let i = 0; i < 7; i++) {
    rankList1.push({
        name: '白鹭岛 ' + (i + 1) + ' 号店',
        total: 1234.56 - i * 100,
    });
}

const searchData = [];
for (let i = 0; i < 5; i += 1) {
    searchData.push({
        index: i + 1,
        keyword: `搜索关键词-${i}`,
        count: Math.floor(Math.random() * 1000),
        range: Math.floor(Math.random() * 100),
        status: Math.floor((Math.random() * 10) % 2),
    });
}

const rankList2 = [];
for (let i = 0; i < 7; i++) {
    rankList2.push({
        name: '白岛 ' + (i + 1) + ' 号店',
        total: 1234.56 - i * 100,
    });
}

export default {
    name: 'Analysis',
    components: {
        ChartCard,
        MiniArea,
        MiniBar,
        MiniProgress,
        Trend,
        Bar,
        Pie,
        RankList,
        NumberInfo,
    },
    data() {
        return {
            tabItem: 'tab1',
            rankList1,
            rankList2,
            searchData,
            radio1: '全部渠道',
        };
    },
    mounted() {
        console.log('测试的： ', this.$store.state.settings.testsss);
    },
    methods: {
        // 列表条数改变
        handleSizeChange() {
            // 调用接口，获取列表
        },
        // 列表页码改变
        handleCurrentChange() {
            // 调用接口，获取列表
        },
    },
};
</script>
<style lang="less" scoped>
.page-header-index-wide {
    max-width: unset;

    .extra-wrapper {
        line-height: 40px;
        padding-right: 24px;
        float: right;
        display: block;
        position: relative;
        z-index: 999;

        .extra-item {
            display: inline-block;
            margin-right: 24px;

            a {
                margin-left: 24px;
                color: #3898ff;
                cursor: pointer;
            }
        }
    }
}
</style>
