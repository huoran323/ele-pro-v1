<template>
  <div class="antv-chart-mini"></div>
</template>
<script>
export default {
  name: "MiniArea",
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$el);
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: "category",
          boundaryGap: false
          // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value",
          show: false
        },
        grid: {
          left: "0%",
          right: "0%",
          top: "3%",
          bottom: "5%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          padding: [5, 5]
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320, 0, 200],
            type: "line",
            smooth: true,
            symbol: "none",
            areaStyle: {
              color: "#3398DB"
            },
            lineStyle: {},
            itemStyle: {
              color: "#3398DB",
              borderType: "dotted"
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
.antv-chart-mini {
  position: relative;
  width: 100%;
  height: 75px;
  bottom: -20px;
}
</style>
