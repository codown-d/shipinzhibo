import { http } from "@/utils/http";
//绑定第三方账户接口
export const getBindingAccountList = (params,needToken) => {
  return http.request("POST", "/api/user/updateBindThirdInfo", {params},{needToken});
}; 
//领取记录接口
export const getReceiveRecordList = (params,needToken) => {
  return http.request("get", "/api/live/activity/getReceiveRecordList", {params},{needToken});
}; 