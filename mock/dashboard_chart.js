// 只有mock文件还不够
// 需要在vue.config.js中配置devServer的proxy
function chart(requestMethod) {
  let res = null;
  switch (requestMethod) {
    case "GET":
      res = [91, 40, 30, 18, 29, 80];
      break;
    default:
      res = null;
  }
  return res;
}

// 因为mock是在node下运行
// 需要node的CommonJS模块规范
module.exports = chart;
