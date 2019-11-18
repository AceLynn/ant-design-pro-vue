// 存放权限校验指令
// 效果等同components下的authorized组件
// 元素只有第一次加载时可以校验，动态更改后无法重新校验
// 好在，一般不会动态更改权限，但也需要留意

import { check } from "../utils/auth";

// 写成可以自己注册的指令
function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        // 校验不通过，从dom节点中移除
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default { install };
