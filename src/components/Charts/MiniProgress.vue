<template>
  <div class="antv-chart-mini"></div>
</template>
<script>
export default {
  name: "MiniProgress",
  mounted() {
    this.drawProgress();
  },
  methods: {
    drawProgress() {
      let myChart = this.$echarts.init(this.$el);
      myChart.setOption({
        grid: { containLabel: true, left: "-20px", right: "0%", top: "95%" },
        xAxis: { name: "amount", show: false, min: 0, max: 100 },
        yAxis: { type: "category", show: false },
        series: [
          {
            data: [78],
            type: "bar",

            itemStyle: {
              color: "#3398DB"
            }
            // encode: {
            //   x: "amount",
            //   y: "product"
            // }
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

