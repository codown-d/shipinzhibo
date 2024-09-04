<script setup>
import router from "@/router";
// import { getRecommendRoom } from '@/api/home';
import { ref, inject, onMounted} from "vue";
// 接收父组件传入的数据
const props = defineProps({
  dataList: {
    type: Array,
    required: true
  }
})
onMounted(() => {
  console.log('是否有获取', props.dataList)
})
</script>

<template>
  <div class="body-img">
    <div class="card-img" v-for="(item, i) in props.dataList" :key="i">
      <a class="recommendCategoryCard" target="_blank" href="https://www.douyu.com/g_jql">
        <span class="recommendCategoryItem">
          <span class="cover recommendCategoryCover">
            <img loading="lazy" class="image-nav image-picture" :src="item.imageUrl" alt="绝区零">
          </span>
        </span>
        <div class="categoryName">{{item.text}}</div>
        <div class="liveCount">{{item.number}}场直播</div>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  a{
    text-decoration: none;
  }
  .body-img {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: -16px -8px;
    .card-img {
      flex: 1;
      margin: 16px 8px;
      background-color: #fff;
      border-radius: 8px;
      .recommendCategoryCard{
        display: block;
        padding-bottom: 60px;
        text-decoration: none;
        .recommendCategoryItem{
          display: block;
          .recommendCategoryCover{
            display: block;
            .image-nav{
              display: block;
              margin: 0 auto;
              width: 142.13px;
              height: 142.13px;
            }
          }
        }
      }
      .categoryName{
        text-align: center;
        color: #333;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-left: auto;
        margin-right: auto;
        margin-top: 9.25926%;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color .2s cubic-bezier(.645,.045,.355,1);
        white-space: nowrap;
        width: 73.46939%;
      }
      .liveCount{
        color: #999;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 2.96296%;
        text-align: center;
      }

      &:hover {
        transform: translateY(-2px);
        z-index: 1;
        .categoryName {
          color: #f70; /* 鼠标悬停时的颜色 */
        }
      }
    }
  }
  //屏幕最小1000px 固定宽度排列
  @media only screen and (min-width: 1000px) {
    .card-img {
        max-width: 20%;
        loat: left;
        // min-width: 16.6666%;
    }
  }
</style>