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
