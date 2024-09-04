<script setup>
import { getRoomTag } from '@/api/home';
import { inject, onMounted, ref } from 'vue';
import { navRoutes } from '@/router';
import { useRoute } from 'vue-router';
import router from '@/router';

// const tagList = inject('tagList')

const handleSelect = (path) => {
  router.push(path)
  defaultActive.value = path
}

const defaultActive = ref('')

onMounted(() => {
  defaultActive.value = useRoute().path
});
</script>

<template>
  <ul class="menu">
    <li class="menu-item" @click="handleSelect(route.path)" :class="route.path === defaultActive ? 'is-active' : ''"
      v-for="route in navRoutes" :key="route.path">
      {{ route.meta.title }}
    </li>
  </ul>
</template>


<style lang="scss" scoped>
.menu {
  height: 60PX;
  display: flex;
  align-items: center;
  list-style-type: none;
  flex: none;

  .menu-item {
    height: 100%;
    font-size: 17PX;
    padding: 0 20PX;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #808080;
    cursor: pointer;
    flex: none;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .is-active {
    color: var(--el-color-primary);
  }
}
</style>