<template>
  <a-input-group compact>
    <a-select v-model="type" style="width:130px" @change="handleTypeChange">
      <a-select-option value="alipay">支付宝</a-select-option>
      <a-select-option value="bank">银行账户</a-select-option>
    </a-select>
    <a-input
      style="width: calc(100% - 130px)"
      v-model="number"
      @change="handleNumberChange"
    />
  </a-input-group>
</template>

<script>
export default {
  // 接收账户的组件
  props: {
    // value写成vaule导致传递参数失败
    // 根据传递的结果来检查变量名是否正确
    value: {
      type: Object
    }
  },
  watch: {
    // 通过setFilesValue来同步值，监控实现
    value(val) {
      // value变换时，同步给type和number
      Object.assign(this, val);
    }
  },
  data() {
    const { type, number } = this.value || {};
    return {
      type: type || "alipay",
      number: number || ""
    };
  },
  methods: {
    handleTypeChange(val) {
      this.$emit("change", { ...this.value, type: val });
    },
    handleNumberChange(e) {
      this.$emit("change", { ...this.value, number: e.target.value });
    }
  }
};
</script>

<style></style>
