<template>
  <div>
    <!-- <a-button type="primary" @click="showDrawer">
      Open
    </a-button> -->
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="300px"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div class="radio-box">
        <h2>整体风格定制</h2>
        <a-radio-group
          :value="$route.query.navTheme || 'dark'"
          @change="e => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
      </div>
      <div>
        <h2>导航模式</h2>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          @change="e => handleSettingChange('navLayout', e.target.value)"
        >
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 抽屉是否隐藏
      visible: false
    };
  },
  methods: {
    // showDrawer() {
    //   this.visible = true;
    // },
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [type]: value
        }
      });
    }
  }
};
</script>
<style scoped>
.handle {
  position: absolute;
  right: 300px;
  top: 240px;
  background: #1890ff;
  color: #fff;
  font-size: 20px;
  width: 48px;
  height: 48px;
  border-radius: 3px 0 0 3px;
  text-align: center;
  line-height: 48px;
}
.radio-box {
  padding-bottom: 20px;
}
</style>
