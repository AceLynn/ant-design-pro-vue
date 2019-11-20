// 只有mock文件还不够
// 需要在vue.config.js中配置devServer的proxy
function form(requestMethod) {
  let res = null;
  switch (requestMethod) {
    case "POST":
      res = { message: "ok" };
      break;
    default:
      res = null;
  }
  return res;
}

// 因为mock是在node下运行
// 需要node的CommonJS模块规范
module.exports = form;
