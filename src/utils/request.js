// axios二次封装
import axios from "axios";
import { notification } from "ant-design-vue";

function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => {
      const {
        response: { status, statusText }
      } = error;
      // notification.error({
      //   message: status,
      //   description: statusText
      // });
      // jsx定制化
      notification.error({
        // 注释掉eslint的检查，h是必须用但是代码中没有调用到的
        // eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            请求错误 <span style="color:red">{status}</span> : {options.url}
          </div>
        ),
        description: statusText
      });

      // 返回reject 如果流程进到这里，就不会再往后进到then
      return Promise.reject(error);
    });
}

export default request;
