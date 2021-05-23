import axios from "axios";
import {
  baseURL,
  contentType,
  debounce,
  requestTimeout,
  successCode,
} from "@/config";
import store from "@/store";
import qs from "qs";
import router from "@/router";
import { isArray } from "@/utils/validate";
import { message } from "ant-design-vue";
import { humpToUnderline } from "@/utils/index";

let loadingInstance;

// 操作正常Code数组
const codeVerificationArray = isArray(successCode) ?
  [...successCode] :
  [...[successCode]];

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
  504: "网关超时",
};

const handleData = ({ config, data, status, statusText }) => {
  if (loadingInstance) loadingInstance.close();
  // 若data.code存在，覆盖默认code
  let code = data && data.code ? data.code : status;
  // 若code属于操作正常code，则status修改为200
  if (codeVerificationArray.includes(code)) {
    code = process.env.VUE_APP_SUCCESS_CODE;
    return data;
  }

  // 若data.msg存在，覆盖默认提醒消息
  const msg = !data ?
    `后端接口 ${config.url} 异常 ${code}：${CODE_MESSAGE[code]}` :
    !data.msg ?
    `后端接口 ${config.url} 异常 ${code}：${statusText}` :
      data.msg;

  console.log("codeerr", code);
  switch (code) {
  case 401:
  case 422:
    message.error(msg || "登录失效");
    store.dispatch("user/resetAll").catch(() => {});
    break;
  case 403:
    router.push({ path: "/403" }).catch(() => {});
    break;
  default:
    message.error(msg || "error");
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
    "Content-Type": contentType,
  },
});

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    if (store.getters["user/token"]) {
      config.headers.Authorization = "Bearer " + store.getters["user/token"];
    }
    if (config.data) {
      // 驼峰转下划线
      let tempData = {};
      Object.keys(config.data).forEach((v) => {
        tempData[humpToUnderline(v)] = config.data[v];
      });
      config.data = tempData;
    }
    if (
      config.data &&
      config.headers["Content-Type"] ===
        "application/x-www-form-urlencoded;charset=UTF-8"
    ) {
      config.data = qs.stringify(config.data);
    }
    if (debounce.some((item) => config.url.includes(item))) {
      loadingInstance = message.info("loading");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => handleData(response),
  (error) => {
    const { response } = error;
    if (response === undefined) {
      message.error("未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起");
      return {};
    } else return handleData(response);
  }
);

export default instance;
