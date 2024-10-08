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
  export const getDynamicAdd = (data) => {
    return http.request("post", "/api/user/dynamic/add", { data },);
  };
  export const getLike = (params,needToken=true) => {
    return http.request("get", "/api/user/dynamic/like",{params},{needToken},);
  };
  export const getUnlike = (params,needToken=true) => {
    return http.request("get", "/api/user/dynamic/unlike", {params},{needToken},);
  };
  export const getDynamicPage = (params,needToken=true) => {
    return http.request("get", "/api/user/dynamic/page", {params},{needToken},);
  };
  let users={}
  export const getUserInfo = async(params,needToken=true) => {
    if(users[params.queryUid]){
      return users[params.queryUid]
    }else{
     let result = await http.request("get", " /api/user/info", {params},{needToken},);
     users[result.data.uid]=result.data
     return result.data
    }
  };
 