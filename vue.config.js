module.exports = {
  // 解决less的配置
  // config配置可以查看cli的官网
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 以下用于修改svgloader
  // 修改后，svg不能作为图片引入，只能作为组件使用
  // 和<img :src="svg" />方式互斥
  // chainWebpack: config => {
  //   const svgRule = config.module.rule("svg");

  //   // 清除已有的所有loader
  //   // 如果你不这样做，接下来的loader会附加在该规则现有的loader之后
  //   svgRule.uses.clear();

  //   // 添加要替换的loader
  //   svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  // },
  // mock
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        // 通过bypass实现数据拦截
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            // console.log(req, res);
            // req=拦截到的请求的url路径
            // name = mock请求文件的名字
            // 比如 dashboard_chart
            // let path = req.path || "";
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            // req.method为拦截到的请求方法
            const result = mock(req.method);
            // 每次请求后，数据会缓存，需要清理掉
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
