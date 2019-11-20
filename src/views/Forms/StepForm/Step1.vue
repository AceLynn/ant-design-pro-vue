<template>
  <div>
    <h1>step 1</h1>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [
                {
                  required: true,
                  message: '请输入付款账号'
                }
              ]
            }
          ]"
          placeholder="请输入付款账号"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <ReceiveAccount
          v-decorator="[
            'receiveAccount',
            {
              initialValue: step.receiveAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  }
                }
              ]
            }
          ]"
          placeholder="请输入收款账号"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ReceiveAccount from "../../../components/ReceiveAccount";
export default {
  components: {
    ReceiveAccount
  },
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
      const { form, $router, $store } = this;
      // 表单验证
      form.validateFields((err, values) => {
        if (!err) {
          // 第一步的表单数据存储到vuex的store字段中
          // 不是提交后台，不是提交异步数据
          $store.commit({
            type: "form/saveStepFormData",
            payload: values
          });

          // 提交完 router跳到第二步
          $router.push("/form/step-form/confirm");
        }
      });
    }
  }
};
</script>

<style></style>
