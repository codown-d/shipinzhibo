import { http } from "@/utils/http";
//全部直播-数据列表
export const getBroadcastAll = (params,needToken) => {
  // console.log('直播页面needToken',needToken);
  return http.request("get", "/api/home/v2/tagindex", {params},{needToken});
};
//我的关注-数据列表
export const getRoomAttentionByUid = (params,needToken) => {
  // console.log('我的关注菜单页面needToken',needToken);
  return http.request("get", "/api/room/attention/getRoomAttentionByUid", {params},{needToken});
};