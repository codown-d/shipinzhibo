import { defineStore } from "pinia";
import { store } from "@/store";
import { getLogin, getUserInfo,getAcquireUserGuest } from "@/api/user";
import { setToken, removeToken } from "@/utils/auth";
import router from "@/router";
import { getUserStorage, setUserStorage } from "@/utils/auth";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    avatar: getUserStorage()?.avatar || "",
    nick: getUserStorage()?.nick || "",
    age: getUserStorage()?.age || "",
    gender: getUserStorage()?.gender || "",
    uid: getUserStorage()?.uid || "",
    // age: getUserStorage()?.age || "",接口未返回性别
    wxName:getUserStorage()?.wxName || "",//第三方用户名称;没有这个字段 后端的意思代表 就没有绑定第三方账户
  }),
  actions: {
    SET_AVATAR(avatar) {
      this.avatar = avatar;
    },
    SET_AGE(age) {
      this.age = age;
    },
    SET_NICK(nick) {
      this.nick = nick;
    },
    SET_UID(uid) {
      this.uid = uid;
    },
    SET_WXNAME(wxName) {
      this.wxName = wxName;
    },
    // SET_AGE(age) {接口未返回性别
    //   this.age = age;
    // },
    SET_GENDER(gender) {
      this.gender = gender;
    },
    //通过用户名登录=暂时作废
    async loginByUsername(data) {
      return new Promise((resolve, reject) => {
        getLogin(data).then((data) => {
          if (data?.message === "SUCCESS") {
            // console.log('[ 登陆接口返回什么 ] >', data)
            setToken(data.data);//获取token，存到localStorage里面
            this.getInfo();
          }
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    //首页默认游客登录 
    async getTouristLogin (data,imei) {
      return new Promise((resolve, reject) => {
        getAcquireUserGuest(data,imei).then((res) => {
          console.log('[ 游客登陆接口返回什么 ] >', res)
          if (res?.message === "SUCCESS") {
            setToken(res.data);//获取token，存到localStorage里面
            this.getInfo();
          }
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    //获取用户信息
    async getInfo() {
      return new Promise((resolve, reject) => {
        const param = {};//空入参
        const needToken = true; // 根据实际需要设置是否需要token
        getUserInfo(param,needToken).then((data) => {
          console.log('[ 获取用户信息接口返回什么 ] >', data.data)
          //存储用户信息
          setUserStorage(data.data);
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    //退出登录 删除token，跳转到登陆页面 ==》暂时废弃
    logOut() {
      removeToken();
      router.push("/login");
    },
  },
});

export function useUserStoreHook() {
  return useUserStore(store);
}
