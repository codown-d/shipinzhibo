<template>
  <div class="emoji">
    <Picker
      :data="emojiIndex"
      @select="selectEmoji"
      :i18n="I18N"
      :showSearch="false"
      :infiniteScroll="false"
      :showCategories="false"
      :showPreview="false"
      :categories="include"
      :emoji="defaultEmoji"
    />
  </div>
</template>

<script setup>
import { ref,  defineEmits } from "vue";
import data from "emoji-mart-vue-fast/data/all.json"; //表情包资源
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker,  EmojiIndex } from "emoji-mart-vue-fast/src";
const I18N = {
  categories: {
    recent: "",
    smileys: "",
  },
};
let include = ["smileys"];
let emojiIndex = new EmojiIndex(data, {
  categories: data.categories.filter((item) => include.includes(item.id)),
  include,
});

const defaultEmoji = ref("smile"); //打开组件会默认选中笑脸
const emit = defineEmits(["onChange"]);
//选中表情包赋值输入框
const selectEmoji = (emoji) => {
  emit("onChange", emoji.native, emoji);
};
</script>

<style lang="scss" scoped></style>
