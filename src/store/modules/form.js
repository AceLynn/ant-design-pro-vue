// 创建分布表单
// 当表单比较复杂时，可以拆分为分布表单

import router from "../../router";
import request from "../../utils/request";
import API from "@/config/api";

// 定义state
const state = {
  // 创建分布表单
  step: {
    // 付款账号
    payAccount: "123456",
    receiveAccount: {
      type: "alipay",
      number: ""
    }
  }
};

// 定义actions，是一个异步的
// 使用es6的 async 和 await
const actions = {
  async submitStepForm({ commit }, { payload }) {
    await request({
      url: API.getForm,
      method: "POST",
      data: payload
    });
    // saveStepFormData是一个mutations方法
    commit("saveStepFormData", { payload });
    // router跳转
    router.push("/form/step-form/result");
  }
};

// mutations
const mutations = {
  saveStepFormData(state, { payload }) {
    // 改变state的值
    state.step = {
      // 先引入原先的信息
      ...state.step,
      // 导入payload的信息
      ...payload
    };
  }
};

export default {
  // 打开命名空间
  namespaced: true,
  state,
  actions,
  mutations
};
