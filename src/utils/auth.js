import { useUserStoreHook } from "@/store/modules/user";


export const userKey = "user-info";
export const TokenKey = "token";

export function getToken() {
  const data = localStorage.getItem(TokenKey)
  return data ? JSON.parse(data) : '';
}
//存储获取token
export function setToken(data) {
  const cookieString = JSON.stringify(data);
  // console.log('存储token方法1',TokenKey);
  // console.log('存储token方法2',cookieString);
  localStorage.setItem(TokenKey,cookieString)
}
//移除token
export function removeToken() {
  localStorage.removeItem(TokenKey);
  localStorage.removeItem(userKey);
}
//存储登陆用户信息
export function setUserStorage(data){
  const {avatar,nick,age,gender} = data
  useUserStoreHook().SET_AVATAR(avatar);
  useUserStoreHook().SET_NICK(nick);
  useUserStoreHook().SET_AGE(age);
  useUserStoreHook().SET_GENDER(gender);

  localStorage.setItem(userKey,JSON.stringify(data))
}

export function getUserStorage(){
  return JSON.parse(localStorage.getItem(userKey))
}
