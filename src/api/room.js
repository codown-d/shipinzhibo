import { http } from "@/utils/http";

export const getRoomKey = (params,needToken) => {
  return http.request("POST", "/api/rtc/getKey", { params }, { needToken });
};
export const getMessageKey = (params,needToken) => {
  return http.request("POST", "/api/room/message/send", { params }, { needToken });
};