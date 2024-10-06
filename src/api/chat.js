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
  export const getMention = (data) => {
    return http.request("get", "/mock/mention", { data },);
  };
  export const getAnchorNews = (data) => {
    return http.request("get", "/mock/anchor-news", { data },);
  };
  export const getReplyAnchorNews = (data) => {
    return http.request("get", "/mock/reply-anchor-news", { data },);
  };

  