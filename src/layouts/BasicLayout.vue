<template>
  <div :class="[`nav-theme-${navTheme}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
      >
        <div class="logo">Ant Design Pro</div>
        <SiderMenu class="menu" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer />
  </div>
</template>

<script>
import Header from "@/layouts/Header";
import SiderMenu from "@/layouts/SiderMenu";
import Footer from "@/layouts/Footer";
import SettingDrawer from "../components/SettingDrawer";
export default {
  data() {
    return {
      // 侧边栏缩小/放大
      collapsed: false
    };
  },
  components: { Header, SiderMenu, Footer, SettingDrawer },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  }
};
</script>

<style scoped>
.trigger {
  padding: 0 24px;
  line-height: 64px;
  vertical-align: top;
  font-size: 20px;
}
.trigger:hover {
  background: #eee;
}
/* 布局，主题 */
.nav-theme-dark >>> .logo,
.nav-theme-dark >>> .menu {
  color: #fff;
}
.logo {
  line-height: 65px;
  height: 65px;
  text-align: center;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}
</style>
