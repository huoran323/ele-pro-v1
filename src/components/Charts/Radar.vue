<template>
  <div :style="{height:height,width:width}"></div>
</template>
<script>
export default {
  name: "Radar",
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
    this.initRadar();
  },
  methods: {
    initRadar() {
      let myChart = this.$echarts.init(this.$el);
      myChart.setOption({
        tooltip: {},
        color: ["#1585ff", "#2aba51", "#f9c515"],
        legend: {
          data: ["个人", "团队", "部门"],
          orient: "horizontal",
          y: "bottom"
        },
        radar: {
          // shape: 'circle',
          splitNumber: 4, // 雷达图圈数设置
          name: {
            textStyle: {
              color: "#666", //外圈顶点字的颜色
              //   backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "引用", max: 100 },
            { name: "热度", max: 100 },
            { name: "贡献", max: 100 },
            { name: "口碑", max: 100 },
            { name: "产量", max: 100 }
          ],
          splitArea: {
            show: true,
            areaStyle: {
              color: ["#fff"] // 图表背景网格的颜色
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: "#f5f5f5" // 图表背景网格线的颜色
            }
          }
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: [83, 70, 68, 95, 60, 79],
                name: "个人"
              },
              {
                value: [70, 64, 88, 61, 32, 61],
                name: "团队"
              },
              {
                value: [54, 19, 22, 38, 49, 25],
                name: "部门"
              }
            ]
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>