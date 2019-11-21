// 入口文件
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 注册权限校验组件
import Authorized from "./components/Authorized";
// 注册校验指令也需要先注册
import Auth from "./directives/auth";

// 注册语言国际化组件
import VueI18n from "vue-i18n";
import enUS from "./locale/enUS";
import zhCN from "./locale/zhCN";
import queryString from "query-string";

// 加载代码高亮插件
import VueHighLight from "vue-highlightjs";
// 高亮样式
import "highlight.js/styles/github.css";

// 这个是全局引入
// import {Antd} from "ant-design-vue";
// import 'ant-design-vue/dist/antd.less'
// Vue.use(Antd);

// 这个无babel的配置
// import Button from "ant-design-vue/lib/button";
// import 'ant-design-vue/lib/button/style'
// Vue.use(Button);

// 需要安装babel-plugin-import模块
// 配置babel后按需引入ant模块
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker
} from "ant-design-vue";

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);

Vue.use(VueI18n);
Vue.use(VueHighLight);
const i18n = new VueI18n({
  // 获取url 使用query-string
  // 将location.search转为对象
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});

// 权限校验 全局注册
Vue.component("Authorized", Authorized);
// 注册指令
Vue.use(Auth);

// 全局注册图标
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1519663_qw81c7pwb2h.js"
});
Vue.component("IconFont", IconFont);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
