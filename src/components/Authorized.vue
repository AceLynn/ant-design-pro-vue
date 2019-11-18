<script>
// 函数式组件中没有this
import { check } from "../utils/auth";
// 该校验函数，常用，可在main.js中注册到全局中使用
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  // render俩参数 currentElement, context
  render(h, context) {
    // 从context中取出props和scopedSlots(作用域插槽)
    // 2.6中 slot 都挂载在scopedSlots下面，可以不用区分作用域还是具名插槽
    const { props, scopedSlots } = context;
    // check传递进来的authority
    // 校验通过 返回插槽；否则 返回null
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
