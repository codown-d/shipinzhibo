import { http } from "@/utils/http";
export const postSendMsg = (data) => {
    return http.request("post", "/mock/send/msg", { data },);
  };
  export const getHotTopic = (params,needToken=true) => {
    return http.request("get", "/api/user/dynamic/subject/page", {params},{needToken},);
  };
  export const getPopularAnchor = (data) => {
    return http.request("get", "/mock/popular-anchor", { data },);
  };
  export const getMention = (params,needToken=true) => {
    return http.request("get", "/api/user/dynamic/subject/page", {params},{needToken},);
  };
  export const getAnchorNews = (data) => {
    return http.request("get", "/mock/anchor-news", { data },);
  };
  export const getReplyAnchorNews = (data) => {
    return http.request("get", "/mock/reply-anchor-news", { data },);
  };

  