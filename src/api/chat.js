import { http } from "@/utils/http";
export const postSendMsg = (data) => {
    return http.request("post", "/mock/send/msg", { data },);
  };
  export const getHotTopic = (data) => {
    return http.request("get", "/mock/hot-topic", { data },);
  };
  export const getPopularAnchor = (data) => {
    return http.request("get", "/mock/popular-anchor", { data },);
  };