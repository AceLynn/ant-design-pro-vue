<template>
  <div>
    <a-form :layout="formLayout" :form="form">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">
            Horizontal
          </a-radio-button>
          <a-radio-button value="vertical">
            Vertical
          </a-radio-button>
          <a-radio-button value="inline">
            Inline
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <!-- 手动校验可以不需要了 -->
        <!-- :validateStatus="fieldAStatus"
        :help="fieldAHelp" -->
        <!-- <a-input  v-model="fieldA" placeholder="input placeholder" /> -->
        <!-- 自动校验不用v-model ant design的方式 -->
        <!-- 用v-decorator -->
        <a-input
          v-decorator="[
            'fieldA',
            {
              initialValue: fieldA,
              rules: [
                {
                  required: true,
                  min: 6,
                  message: '必须大于5个字符'
                }
              ]
            }
          ]"
          placeholder="input placeholder"
        />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    // this.$form 为main.js中Vue.use后注册到Vue全局中的方法
    // 参数this：用来组件底层内部，数据改变时会调用这个this，直接去更新当前的组件
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      fieldA: "hello"
      // fieldAStatus: "",
      // fieldAHelp: ""
    };
  },
  mounted() {
    setTimeout(() => {
      // 动态改变form的值得
      // fieldA中initialValue的值只有第一次有效，动态改变需要每次调用setFieldsValue来改变
      this.form.setFieldsValue({ fieldA: "hello world" });
    }, 3000);
  },
  watch: {
    // 监听事件可以都写在watch中
    // 不用像jq时代检测input的输入
    // 通过v-model双向绑定数据后，监听数据变动即可
    // 自动校验后，就不需要了
    // fieldA(val) {
    //   if (val.length <= 5) {
    //     this.fieldAStatus = "error";
    //     this.fieldAHelp = "必须大于5个字符";
    //   } else {
    //     this.fieldAStatus = "";
    //     this.fieldAHelp = "";
    //   }
    // }
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          // 如果数据校验通过，提交后台啦
          // 可以开始同步数据
          // this.fieldA = values.fieldA;
          // 数据多的时候，可以直接values赋值到this上
          Object.assign(this, values);
        }
      });
      // 如果输入不符合就不能提交
      // if (this.fieldA.length <= 5) {
      //   // this.fieldAStatus = "error";
      //   // this.fieldAHelp = "必须大于5个字符";
      //   // console.log("提交失败");
      // } else {
      //   // console.log("提交成功");
      // }
    }
  }
};
</script>
