import { http } from "@/utils/http";
//推荐列表
export const getBroadcastAll = (params,needToken) => {
  console.log('直播页面needToken',needToken);
  return http.request("get", "/api/home/v2/tagindex", {params},{needToken});
};