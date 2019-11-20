<template>
  <div style="text-align:center;">
    <IconFont type="icon-browser-" style="font-size: 100px;" />
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1519663_qw81c7pwb2h.js"
});
export default {
  components: {
    IconFont
  }
};
</script>

<style></style>
