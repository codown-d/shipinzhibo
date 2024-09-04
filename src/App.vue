<script setup>
import { useAppStoreHook } from '@/store/modules/app';

//监听窗口的 resize 事件，当窗口大小发生变化时触发回调函数。
window.addEventListener('resize', (e) => {
  // console.log('设备宽', document.body.clientWidth)
  const store = useAppStoreHook()
  store.device = document.documentElement.clientWidth < 800 ? "mobile" : "desktop"
})

window.addEventListener("scroll", function () {
  // console.log('高', window.scrollY)
  const store = useAppStoreHook()
  store.scrollY = window.scrollY
})


</script>

<template>
  <RouterView></RouterView>
</template>

<style lang="scss">
@import url("/src/assets/reset.scss");
@import url("/src/assets/common.scss");
</style>
