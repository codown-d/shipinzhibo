import { http } from "@/utils/http";
//查询赛事列表
export const getLiveMatchList = (params,needToken) => {
  return http.request("get", "/api/live/match/getLiveMatch", {params},{needToken});
}; 
//查询左侧菜单栏赛事直播列表
export const getMatchRoomList = (params,needToken) => {
  return http.request("get", "/api/home/matchRoomList", {params},{needToken});
}; 