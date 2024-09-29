import { http } from "@/utils/http";
//搜索页面-查询用户接口
export const getSearchroomList = (params,needToken) => {
  return http.request("get", "/api/search/room", {params},{needToken});
}; 