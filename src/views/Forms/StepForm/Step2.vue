<template>
  <div>
    <h1>step 2</h1>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        {{ step.payAccount }}
      </a-form-item>
      <a-form-item
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        {{ step.receiveAccount.type }} - {{ step.receiveAccount.number }}
      </a-form-item>
      <a-form-item
        label="密 码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'password',
            {
              initialValue: step.password,
              rules: [
                {
                  required: true,
                  message: '请输入密码'
                }
              ]
            }
          ]"
          type="password"
          placeholder="请输入密码"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onPrev">上一步</a-button>
        <a-button
          style="margin-left: 20px;"
          type="primary"
          @click="handleSubmit"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    // create一个form实例
    this.form = this.$form.createForm(this);
    return {
      // 布局配置
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      // 嵌套比较深，可以用计算属性
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmit() {
      // 定义变量，方便使用
      const { form, $store, step } = this;
      // 表单验证
      form.validateFields((err, values) => {
        if (!err) {
          // 第二部是异步提交数据了
          // dispatch触发actions里的submitStepForm提交后台来触发commit
          // 最后触发修改信息
          $store.dispatch({
            type: "form/submitStepForm",
            payload: { ...step, ...values }
          });
        }
      });
    },
    onPrev() {
      this.$router.push("/form/step-form/info");
    }
  }
};
</script>

<style></style>
