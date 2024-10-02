<template>
  <div>
    <chat-message></chat-message>
    <div class="margin-top-sm" v-for="item in 2">
      <anchor-news></anchor-news>
    </div>
  </div>
</template>
<script setup>
import ChatMessage from '@/components/ChatMessage.vue'
import AnchorNews from '@/components/AnchorNews.vue'
</script>
<style lang="sass" scoped>
</style>