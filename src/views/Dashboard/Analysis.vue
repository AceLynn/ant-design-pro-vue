<template>
  <div>
    <h1>分析页</h1>
    {{ $t("message")["app.dashboard.analysis.timeLabel"] }} :
    <a-date-picker></a-date-picker>
    <ECharts :option="chartOption" style="height: 400px" />
  </div>
</template>

<script>
import ECharts from "../../components/EChats";
// import random from "lodash/random";
// import axios from "axios";
// api config
import API from "../../config/api";
import request from "../../utils/request";

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
    this.getChartData();
    // 模拟option动态更改时的触发
    this.interval = setTimeout(() => {
      this.getChartData();
      // 每次更新时，手动赋值chartoption
      // 触发子组件的监听
      this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  // 将操作函数本身写在这里
  // 逻辑写在周期函数中
  methods: {
    getChartData() {
      request({
        url: API.getChart,
        method: "get",
        params: {
          ID: 12345
        }
      }).then(res => {
        this.chartOption.series[0].data = res.data;
      });
      // axios.get(API.getChart, { params: { ID: 12345 } }).then(res => {
      //   this.chartOption.series[0].data = res.data;
      // });
    }
  },
  beforeDestroy() {
    clearTimeout(this.interval);
  }
};
</script>

<style></style>
