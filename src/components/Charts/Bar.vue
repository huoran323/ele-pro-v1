<template>
  <div id="main" class="bar">
    <h4 :style="{ marginBottom: '20px' }">{{title}}</h4>
    <div id="bar" :style="{height:height,width:width}"></div>
  </div>
</template>
<script>
export default {
  name: "Bar",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    },
    title: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      myChart: null
    };
  },

  mounted() {
    this.drawBar();
  },
  beforeDestroy: function() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    drawBar() {
      let chartDom = document.getElementById("bar");
      this.myChart = this.$echarts.init(chartDom);
      this.myChart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 10,
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220, 100, 139, 200, 23, 49]
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
.bar {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
