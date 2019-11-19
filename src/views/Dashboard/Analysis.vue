<template>
  <div>
    <h1>分析页</h1>
    <ECharts :option="chartOption" style="height: 400px" />
  </div>
</template>

<script>
import ECharts from "../../components/EChats";
import random from "lodash/random";
export default {
  data() {
    return {
      chartOption: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  components: {
    ECharts
  },
  mounted() {
    // 模拟option动态更改时的触发
    this.interval = setInterval(() => {
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => random(100)
      );
      // 每次更新时，手动赋值chartoption
      // 触发子组件的监听
      this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style></style>
