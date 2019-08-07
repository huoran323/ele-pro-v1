<template>
  <div class="page-header-index-wide">
    <el-row :gutter="24">
      <el-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card title="总销售额" total="¥126,560">
          <el-tooltip content="指标说明" slot="action" placement="top">
            <i class="el-icon-warning-outline"></i>
          </el-tooltip>
          <div>
            <!-- <mini-area /> -->
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
        </chart-card>
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
  Trend
} from "@/components";
export default {
  name: "Analysis",
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    Trend
  }
};
</script>
<style lang="less" scoped>
.page-header-index-wide {
  max-width: unset;
}
</style>
