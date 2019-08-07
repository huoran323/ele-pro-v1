<template>
  <div id="myChart" class="antv-chart-mini"></div>
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
      let myChart = this.$echarts.init(document.getElementById("myChart"));
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
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320, 0, 200],
            type: "line",
            smooth: true,
            symbol: "none",
            areaStyle: {
              color: "#137aff"
            },
            lineStyle: {},
            itemStyle: {
              color: "#137aff",
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
  position: absolute;
  width: 100%;
  height: 75px;
  bottom: -20px;
}
</style>
