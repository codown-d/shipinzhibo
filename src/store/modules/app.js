import { defineStore } from "pinia";
import { store } from "@/store"

export const useAppStore = defineStore({
  id: "app",
  state: ()=>({ 
    //监听设备是PC还是移动端，小于800的话device=mobile是移动端，否则device=mobiledesktop
    device: document.documentElement.clientWidth < 800 ? "mobile" : "desktop",
    // 浏览器窗口的可视区域大小
    viewportSize: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    },
    scrollY:0
  })
})

export function useAppStoreHook() {
  return useAppStore(store);
}