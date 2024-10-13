import { http } from "@/utils/http";

export const getRecommendRoom = (params,needToken) => {
  return http.request("get", "/api/home/recommendRoom", {params},{needToken});
};

export const getRoomTag = (needToken) => {
  return http.request("get", "/api/home/getRoomTag", {needToken});
};

export const getIndexBanner = (params,needToken) => {
  return http.request("get", "/api/home/getIndexBanner",{params},{needToken});
};