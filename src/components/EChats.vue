<template>
  <div ref="chartDom"></div>
</template>

<script>
// 引入插件 这种会全部引入
// import echarts from "echarts";
// 按需引入echart,核心包+柱状图包+title包
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
// 引入监听dom加载完成插件
import { addListener, removeListener } from "resize-detector";
// 延迟触发插件，避免频繁事件多次触发
import debounce from "lodash/debounce";
export default {
  props: {
    option: {
      type: Object,
      // options是object，所以default必须是function，用箭头函数设置默认值
      default: () => {}
    }
  },
  data() {
    // 这个只是个变量，不需要响应数据，不需要放在data的return里面
    this.chart = null;
    return {};
  },
  created() {
    // 或者在这边使用debounce，mounted中使用的就是debounce过后的resize方法
    this.resize = debounce(this.resize, 300);
  },
  // 插件放在mounted中，等dom挂载后执行
  mounted() {
    this.renderChart();
    // // 基于准备好的dom，初始化echarts实例
    // this.chart = echarts.init(this.$refs.chartDom);
    // addListener两个参数，一个是元素对象，一个是回调
    // addListener(this.$refs.chartDom, debounce(this.resize, 300));
    addListener(this.$refs.chartDom, this.resize);
    // 绘制图表
    // this.chart.setOption({
    //   title: {
    //     text: "ECharts 入门示例"
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: "销量",
    //       type: "bar",
    //       data: [5, 20, 36, 10, 10, 20]
    //     }
    //   ]
    // });
  },
  methods: {
    // 绘制图表
    resize() {
      // this.chart.setOption(this.props.options);
      console.log("resize");
      this.chart.resize();
    },
    // 图标渲染 抽象出来
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      // 调用props的参数，直接this.option
      // 而不是this.props.option
      this.chart.setOption(this.option);
    }
  },
  watch: {
    option(val) {
      // 在父组件中每次chartOption更新时，让它被重新赋值为新值，触发这边的监听
      this.chart.setOption(val);
    }
    // 如果父组件的chartOption只是部分内容变，option就监听不到，需要深度监听
    // 深度监听比较耗性能，尽量不用
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  beforeDestroy() {
    // 取消绑定
    removeListener(this.$refs.chartDom, this.resize);
    // 销毁组件，防止内存泄漏
    this.chart.dispose();
    this.chart = null;
  }
};
</script>
