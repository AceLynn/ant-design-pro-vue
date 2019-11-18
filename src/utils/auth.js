// 权限校验函数
export function getCureentAuthority() {
  // 一般是后台返回的权限结果
  // 可考虑的思路：
  // 用户信息（role）admin应该登录成功后存到vuex里面，每次路由守卫通过vuex里拿role判断是否有访问权限比较好的吧。如果页面刷新没有了vuex里的role，到时候在路由守卫里调接口判断权限。实际开发中应该是这么做的吧。
  // 比对后台返回的权限和meta的权限信息是否匹配
  // return ['admin']
  return ["user"];
}

export function check(authority) {
  // 校验函数
  // 获取当前权限
  // 比对系统权限
  const current = getCureentAuthority();
  return current.some(item => authority.includes(item));
}

export function isLogin() {
  // 登录权限 是否登录
  // 测试用
  // 获取到权限，并且不是guest，认为登录了。
  const current = getCureentAuthority();
  return current && current[0] !== "guest";
}
