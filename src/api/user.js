import { http } from "@/utils/http";

export const getLogin = (data) => {
  return http.request("post", "/api/app/auth/login", { data });
};
//默认游客登录
export const getAcquireUserGuest = (data,imei) => {
  // console.log('[ 接口接收到imei浏览器唯一标识 ] >', imei)
  return http.request("post", "/api/user/guest", { data }, { imei });
}
//needToken标识true为需要token
export const getUserInfo = (params,needToken) => {
  // console.log('[ 用户信息接口入参1 ] >',params)
  // console.log('[ 用户信息接口入参2 ] >',needToken)
  return http.request("get", "/api/user/my_info", { params }, { needToken });
};

