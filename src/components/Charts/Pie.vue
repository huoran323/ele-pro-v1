<template>
  <div :style="{height:height,width:width}"></div>
</template>
<script>
export default {
  name: "Pie",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let myChart = this.$echarts.init(this.$el);
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          y: "bottom",
          data: [
            "家用电器",
            "食用酒水",
            "个护健康",
            "服饰箱包",
            "母婴产品",
            "其他"
          ]
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "left"
              }
              //   emphasis: {
              //     show: true,
              //     textStyle: {
              //       fontSize: "30",
              //       fontWeight: "bold"
              //     }
              //   }
            },
            color: [
              "#fbce38",
              "#f05b72",
              "#8d58e1",
              "#3898ff",
              "#36c4c4",
              "#4ac46a"
            ],
            grid: {
              left: "0%",
              right: "0%",
              bottom: "15%",
              top: "10%"
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { name: "家用电器", value: 32.2 },
              { name: "食用酒水", value: 21 },
              { name: "个护健康", value: 17 },
              { name: "服饰箱包", value: 13 },
              { name: "母婴产品", value: 9 },
              { name: "其他", value: 7.8 }
            ]
          }
        ]
      });
      setTimeout(() => {
        myChart.resize();
      }, 0);
      // 根据屏幕尺寸自行调整宽度
      window.onresize = myChart.resize;
    }
  }
};
</script>
<style lang="less" scoped>
</style>