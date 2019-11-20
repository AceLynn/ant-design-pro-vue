<template>
  <div class="header">
    <span>HEADER</span>
    <a-dropdown>
      <a-icon type="global"></a-icon>
      <a-menu
        slot="overlay"
        @click="localeChange"
        :selectedKeys="[$route.query.locale || 'zhCN']"
      >
        <a-menu-item key="zhCN">
          中文
        </a-menu-item>
        <a-menu-item key="enUS">
          English
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    localeChange({ key }) {
      this.$router.push({
        query: { ...this.$route.query, locale: key }
      });
      // 切换路由时，同样改变自定义的i18n内容
      this.$i18n.locale = key;
    }
  }
};
</script>

<style scoped>
.header {
  float: right;
  margin-right: 30px;
}
</style>
