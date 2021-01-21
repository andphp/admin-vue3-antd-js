import Vue from "vue";
import axios from "axios";
import {
  baseURL,
  contentType,
  debounce,
  requestTimeout,
  successCode,
  tokenName
} from "@/config";
import store from "@/store";
import qs from "qs";
import router from "@/router";
import { isArray } from "@/utils/validate";

let loadingInstance;

// 操作正常Code数组
const codeVerificationArray = isArray(successCode)
  ? [...successCode]
  : [...[successCode]];

const CODE_MESSAGE = {
  200: "服务器成功返回请求数据",
  201: "新建或修改数据成功",
  202: "一个请求已经进入后台排队（异步任务）",
  204: "删除数据成功",
  400: "发出信息有误",
  401: "用户没有权限（令牌、用户名、密码错误）",
  403: "用户得到授权，但是访问是被禁止的",
  404: "访问资源不存在",
  406: "请求格式不可得",
  410: "请求资源被永久删除，且不会被看到",
  500: "服务器发生错误",
  502: "网关错误",
  503: "服务不可用，服务器暂时过载或维护",
  504: "网关超时"
};

const handleData = ({ config, data, status, statusText }) => {
  if (loadingInstance) loadingInstance.close();

  // 若data.code存在，覆盖默认code
  let code = data && data.code ? data.code : status;
  // 若code属于操作正常code，则status修改为200
  if (codeVerificationArray.includes(code)) code = 200;
  // 若data.msg存在，覆盖默认提醒消息
  const msg = !data
    ? `后端接口 ${config.url} 异常 ${code}：${CODE_MESSAGE[code]}`
    : !data.msg
    ? `后端接口 ${config.url} 异常 ${code}：${statusText}`
    : data.msg;

  switch (code) {
    case 200:
      // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
      // 例如响应内容：
      //  错误内容：{ status: 1, msg: '非法参数' }
      //  正确内容：{ status: 200, data: {  }, msg: '操作正常' }
      // 修改返回内容为 `data` 内容，对于绝大多数场景已经无须再关心业务状态码(code)和消息(msg)
      // return data.data
      // 或者依然保持完整的格式
      return data;
    case 401:
      Vue.prototype.$baseMessage(msg, "error");
      store.dispatch("user/resetAll").catch(() => {});
      break;
    case 403:
      router.push({ path: "/403" }).catch(() => {});
      break;
    default:
      Vue.prototype.$baseMessage(msg, "error");
      break;
  }
  return data;
};

/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    "Content-Type": contentType
  }
});

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  config => {
    if (store.getters["user/accessToken"])
      config.headers[tokenName] = store.getters["user/accessToken"];
    if (
      config.data &&
      config.headers["Content-Type"] ===
        "application/x-www-form-urlencoded;charset=UTF-8"
    )
      config.data = qs.stringify(config.data);
    if (debounce.some(item => config.url.includes(item)))
      loadingInstance = Vue.prototype.$baseLoading();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  response => handleData(response),
  error => {
    const { response } = error;
    if (response === undefined) {
      Vue.prototype.$baseMessage(
        "未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起",
        "error"
      );
      return {};
    } else return handleData(response);
  }
);

export default instance;
