import { http } from "@/utils/http";
//获取活动信息接口=详情红包
export const getRedPacketList = (params,needToken) => {
  return http.request("get", "/api/live/activity/getActivityList", {params},{needToken});
}; 
//获取红包是否中奖
export const getRedPacketWinOrNot = (params,needToken) => {
  return http.request("POST", "/api/live/activity/startDraw", {params},{needToken});
}; 
//获取关注&取消关注
export const getFollowList = (params,needToken) => {
  return http.request("POST", "/api/room/attention/attentions", {params},{needToken});
}; 
//查询直播间详情
export const getdetailsList = (params,needToken) => {
  return http.request("get", "/api/room/pre", {params},{needToken});
}; 
//查询是否关注接口
export const getWhetherFollowList = (params,needToken) => {
  return http.request("POST", "/api/room/attention/checkAttentions", {params},{needToken});
}; 
//查询福袋规则数据参数：key：activity_desc
export const getConfValueByKeyList = (params,needToken) => {
  return http.request("get", "/api/common/getConfValueByKey", {params},{needToken});
}; 

// 获取typeList==2循环播放的语音url地址
export const getVoiceTvList = (params,needToken) => {
  return http.request("get", "/api/room/tv/list", {params},{needToken});
}; 