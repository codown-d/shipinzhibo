import { http } from "@/utils/http";

export const getRecommendRoom = (params,needToken) => {
  return http.request("get", "/api/home/recommendRoom", {params},{needToken});
};

export const getRoomTag = (params) => {
  return http.request("get", "/api/home/getRoomTag", {params});
};