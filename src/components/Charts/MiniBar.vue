<template>
  <div class="antv-chart-mini"></div>
</template>
<script>
export default {
  name: "MiniBar",
  mounted() {
    this.drawBar();
  },
  methods: {
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$el);
      myChart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "0%",
          right: "0%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            show: false
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
.antv-chart-mini {
  position: absolute;
  width: 100%;
  height: 75px;
  bottom: -20px;
}
</style>

