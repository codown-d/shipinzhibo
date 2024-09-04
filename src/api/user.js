import { http } from "@/utils/http";

export const getLogin = (data) => {
  return http.request("post", "/api/app/auth/login", { data });
};
//needToken标识true为需要token
export const getUserInfo = (params,needToken) => {
  console.log('[ 用户信息接口入参1 ] >',params)
  console.log('[ 用户信息接口入参2 ] >',needToken)
  return http.request("get", "/api/user/my_info", { params }, { needToken });
};
