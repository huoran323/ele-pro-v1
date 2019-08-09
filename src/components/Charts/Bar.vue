<template>
  <div class="bar">
    <h4 :style="{ marginBottom: '20px' }">销售额</h4>
    <div id="bar" :style="{height:height,width:width}"></div>
  </div>
</template>
<script>
import { debounce } from "@/utils";

export default {
  name: "Bar",
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "1100px"
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  data() {
    return {
      myChart: null
    };
  },
  // watch: {
  //   handler() {
  //     this.drawBar();
  //   }
  // },
  mounted() {
    this.drawBar();
    // this.__resizeHandler = debounce(() => {
    //   if (this.myChart) {
    //     this.myChart.resize();
    //   }
    // }, 100);
    // window.addEventListener("resize", this.__resizeHandler);
    window.addEventListener(
      "resize",
      this.myChart.resize({
        width: "auto",
        height: 300
      })
    );
  },
  // beforeDestroy() {
  //   if (!this.myChart) {
  //     return;
  //   }
  //   window.removeEventListener("resize", this.__resizeHandler);
  //   this.myChart.dispose();
  //   this.myChart = null;
  // },
  methods: {
    drawBar() {
      let chartDom = document.getElementById("bar");
      // chartDom.style.width = window.innerWidth / 2 + "px";
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
      this.myChart.resize({
        width: "auto",
        height: 300
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
