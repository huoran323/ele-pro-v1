<template>
  <div class="page-header-index-wide">
    <el-row :gutter="24">
      <el-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card title="总销售额" total="¥126,560">
          <el-tooltip content="指标说明" slot="action" placement="top">
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
          <el-tooltip content="指标说明" slot="action" placement="top">
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
          <el-tooltip content="指标说明" slot="action" placement="top">
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
          <el-tooltip content="指标说明" slot="action" placement="top">
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

    <el-card>
      <div>
        <div class="extra-wrapper">
          <div class="extra-item">
            <a>今日</a>
            <a>本周</a>
            <a>本月</a>
            <a>本年</a>
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
          <el-tab-pane label="销售额" name="tab1" :lazy="true">
            <el-row :gutter="24">
              <el-col :xl="16" :md="12" :sm="24">
                <bar title="销售额排行" v-if="'tab1' === tabItem" />
              </el-col>
              <el-col :xl="8" :md="12" :sm="24">
                <rank-list title="门店销售排行榜" :list="rankList1" />
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="访问量" name="tab2" :lazy="true">
            <el-row :gutter="24">
              <el-col :xl="16" :md="12" :sm="24">
                <bar title="销售额趋势" v-if="'tab2' === tabItem" />
              </el-col>
              <el-col :xl="8" :md="12" :sm="24">
                <rank-list title="门店销售排行榜" :list="rankList2" />
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>

    <el-row :gutter="24">
      <el-col :sm="24" :md="12" :xl="12">
        <el-card :style="{ marginTop: '24px', minHeight: '500px' }">
          <el-row :gutter="68">
            <el-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px'}"></el-col>
            <el-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px'}"></el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12" :xl="12">
        <el-card :style="{ marginTop: '24px', minHeight: '500px' }"></el-card>
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
  RankList
} from "@/components";

const rankList1 = [];
for (let i = 0; i < 7; i++) {
  rankList1.push({
    name: "白鹭岛 " + (i + 1) + " 号店",
    total: 1234.56 - i * 100
  });
}

const rankList2 = [];
for (let i = 0; i < 7; i++) {
  rankList2.push({
    name: "白岛 " + (i + 1) + " 号店",
    total: 1234.56 - i * 100
  });
}

export default {
  name: "Analysis",
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    Trend,
    Bar,
    RankList
  },
  data() {
    return {
      tabItem: "tab1",
      rankList1,
      rankList2
    };
  }
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

// .el-tab-pane > .active {
//   display: block !important;
// }
</style>

   