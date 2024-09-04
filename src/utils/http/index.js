import Axios from "axios";
import { stringify } from "qs";
import NProgress from "@/utils/progress";
import { getToken,removeToken } from "@/utils/auth";
import router from "@/router";
import { message } from "@/utils/message";
//默认的axios配置项
const defaultConfig = {
  // 请求超时时间
  timeout: 10000,
  //设置请求头信息
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",//请求体
    "X-Requested-With": "XMLHttpRequest",
  },
  //请求参数进行序列化
  paramsSerializer: {
    serialize: stringify,
  },
};

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** `token`过期后，暂存待执行的请求 */
  static requests = [];

  /** 防止重复刷新`token` */
  static isRefreshing = false;

  /** 初始化配置对象 */
  static initConfig = {};

  /** 保存当前`Axios`实例对象 */
  static axiosInstance = Axios.create(defaultConfig);

  /** 重连原始请求 */
  static retryOriginalRequest(config) {
    return new Promise((resolve) => {
      PureHttp.requests.push((token) => {
        resolve(config);
      });
    });
  }

  /** 请求拦截 */
  httpInterceptorsRequest() {
    PureHttp.axiosInstance.interceptors.request.use(
      async (config) => {
        // 开启进度条动画
        NProgress.start();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(config);
          return config;
        }
        if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback(config);
          return config;
        }

        // console.log('是什么数据',config.headers);

        /** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
        const whiteList = ["/login"];
        return whiteList.some((url) => config.url.endsWith(url))
          ? config
          : new Promise((resolve) => {
              const data = getToken();
              console.log('config===',config)
              //接口需要token标识config.needToken为true再赋值
              if (config.needToken && data) {
                config.headers["Ticket"] = data.access_token
                config.headers["Uid"] = data.uid
                resolve(config);
              } else {
                resolve(config);
              }
            });
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  httpInterceptorsResponse() {
    const instance = PureHttp.axiosInstance;
    instance.interceptors.response.use(
      (response) => {
        const $config = response.config;
        // 关闭进度条动画
        NProgress.done();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof $config.beforeResponseCallback === "function") {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (PureHttp.initConfig.beforeResponseCallback) {
          PureHttp.initConfig.beforeResponseCallback(response);
          return response.data;
        }

        return response.data;
      },
      //处理HTTP响应中的错误情况
      (error) => {
        console.log('%c [ error ]-106', error)
        const $error = error;
        // console.log('是什么1', $error)
        $error.isCancelRequest = Axios.isCancel($error);
        // console.log('是什么2', $error.isCancelRequest)
        //用户的token过期
        const {data} = $error.response
        if(data.code === 401){
          // removeToken()//移除token
          message("token过期，请重新登录", { type: "error" });
          // router.push('/login')//跳转登陆页面
        }
        // 关闭进度条动画
        NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  /** 通用请求工具函数 */
  request(method, url, param, axiosConfig) {
    // console.log('通用请求函数1',axiosConfig)
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
      // headers: {
      //   isToken: isToken
      // }
    };
    // console.log('通用请求函数2', config)
    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /** 单独抽离的`post`工具函数 */
  post(url, params, config) {
    return this.request("post", url, params, config);
  }

  /** 单独抽离的`get`工具函数 */
  get(url, params, config) {
    return this.request("get", url, params, config);
  }
}

export const http = new PureHttp();
