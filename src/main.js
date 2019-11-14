// 入口文件
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

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
import { Button, Layout, Icon, Drawer, Radio } from "ant-design-vue";

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
