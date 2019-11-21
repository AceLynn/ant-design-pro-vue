<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>
<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import moment from "moment";
// vue.config.js中配置忽略语言包后，需要手动引入；默认带enUS，不需要引入
import "moment/locale/zh-cn";

export default {
  data() {
    return {
      locale: zhCN
    };
  },
  watch: {
    "$route.query.locale": function(val) {
      this.locale = val === "enUS" ? enUS : zhCN;
      // 语言切换只对antd组件库和moment有用
      // 单个组件都必须本身支持才可以
      // 日期日历用的moment，切换语言要同步切换
      // moment并非antd组件
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    }
  }
};
</script>

<style lang="less"></style>
