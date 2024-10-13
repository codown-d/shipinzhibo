<template>
  <div v-loading="isLoading" class="loading-container">
    <div v-if="isLoading"></div>
    <div v-else class="layout-boxnav">
      <!-- 我的关注 -->
      <div v-show="isLiveinfull" :class="device ? '' : 'mobile_plate'" style="background-color: #fff;">
        <Plate :tagList="tagHotlsit" :headerTitle="'我的关注'"></Plate>
      </div>
      <!-- 标签类型数据显示 -->
      <div v-show="!isLiveinfull" :class="device ? '' : 'mobile_plate'" style="background-color: #fff;">
        <Plate :tagList="SevenTagHotlsit" :headerTitle="isroomTag"></Plate>
      </div>
      <!-- 推荐直播 -->
      <div :class="device ? '' : 'mobile_plate'" style="background-color: #fff;">
        <Plate :tagList="tagList" :headerTitle="'推荐直播'"></Plate>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,defineProps, onUnmounted,nextTick,onUpdated,watch} from 'vue';
import { getRecommendRoom, getRoomTag } from '@/api/home';
import { getBroadcastAll,getRoomAttentionByUid } from '@/api/types';
import Plate from '@/components/Plate.vue';
import { ElLoading } from 'element-plus';
import { useStorage } from "@/utils/lib";
let tagAct = JSON.parse(useStorage.get("tagAct") || "{}");
const isLoading = ref(true); // 加载状态
const props = defineProps({
  firstOrderList: Object,//一级菜单的数据
  selectedItem: Object,//二级菜单的数据
});

const device = ref('');//是否pc移动端 用于显示的样式
const tagList = ref([]);//推荐直播数据
const tagHotlsit = ref([]);//我的关注数据
const SevenTagHotlsit = ref([]);//7大类型不同的数据
//推荐列表数据
const getRecommended = () =>{
  // 显示全局加载指示器
  const loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  const needToken = true;// 根据实际需要设置是否需要token
  //type=1 推荐，type=2热门
  getRecommendRoom({ type: 1 },needToken).then((res) => {
    console.log('[ 直播页推荐直播列表数据 ] >', res.data)
    tagList.value = res.data;

    isLoading.value = false; // 数据加载完成，隐藏加载状态
    loadingInstance.close();//销毁loading
  }).catch(error => {
    isLoading.value = false; // 数据加载完成，隐藏加载状态
    loadingInstance.close();//销毁loading
  })
};
//我的关注列表数据
const getRecommendedAll = () =>{
  // 显示全局加载指示器
  const loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  const needToken = true;// 根据实际需要设置是否需要token
  //type=1 推荐，type=2热门
  getRoomAttentionByUid({ tagId: 0,pageNum: 1,pageSize: 20 },needToken).then((res) => {
    console.log('[ 我的关注页全部直播列表数据 ] >', res.data)
    tagHotlsit.value = res.data;

    isLoading.value = false; // 数据加载完成，隐藏加载状态
    loadingInstance.close();//销毁loading
  }).catch(error => {
    isLoading.value = false; // 数据加载完成，隐藏加载状态
    loadingInstance.close();//销毁loading
  })
};
//根据监听不同类型 查询不同数据7大类型
const getRecommendedTagtype = (tagId) =>{
  const needToken = true;// 根据实际需要设置是否需要token
  //type=1 推荐，type=2热门
  getBroadcastAll({ tagId: tagId, pageNum: 1, pageSize: 20 },needToken).then((res) => {
    
    SevenTagHotlsit.value = res.data
  })
};
const isLiveinfull = ref(!tagAct["tagId"]);//用于控制左侧菜单是全部直播选项 再显示对应的数据模块
const isroomTag = ref(tagAct["roomTag"]);//用于显示不同的标题
// 监听 firstOrderList 的变化
watch(() => props.firstOrderList, (newVal, oldVal) => {
  console.log('右侧组件监听一级选中数据', newVal);
  if (newVal.text == "全部直播") {
    isLiveinfull.value = true;
  }
});
// 监听 selectedItem 的变化
watch(() => props.selectedItem, (newVal, oldVal) => {
  console.log('右侧组件监听二级选中数据', newVal);
  if (newVal) {
    //选中二级把一级的状态全部直播隐藏
    isLiveinfull.value = false;
    isroomTag.value = newVal.roomTag;//标签不同的标题
    //监听标签选中不同的获取对应的tagId去查询对应数据
    getRecommendedTagtype(newVal.tagId)
  }
});

onMounted(()=>{
  console.log(tagAct);
  //监听标签选中不同的获取对应的tagId去查询对应数据
  if (tagAct["tagId"]) {
    getRecommendedTagtype(tagAct["tagId"]);
  }
  getRecommended();
  getRecommendedAll();
  console.log('右侧组件获取左侧菜单选中的一级对象数据',props.firstOrderList);
  console.log('右侧组件获取左侧菜单选中的二级对象数据',props.selectedItem);
  // console.log('右侧组件获取左侧菜单选中的二级对象数据',props.selectedItem.roomTag);
  
});
</script>

<style lang="scss" scoped>
.loading-container{
  position: relative;
  width: 100%;
  height: 100%;
}
a{
  text-decoration: none;
  color: inherit;
}
.layout-boxnav{
  padding: 0 14px 0 26px;
  .layout-Module-head{
    display: flex;
    margin-bottom: 10px;
    // padding-left: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 34px;
    .layout-Module-title{
      font-size: 30px;
      margin-right: 20px;
      font-weight: bold;
    }
    .listRecommend-refresh{
      width: 56px;
      height: 20px;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      color: #a9a9a9;
      border: 1px solid #a9a9a9;
      border-radius: 5px;
      margin-top: 12px;
    }
    .listRecommend-refresh:hover{
      color: #fda031;
      border-color: #fda031;
    }
  }

  .layout-Module-container{
    margin-bottom: 10px;
    .layout-ul{
      display: flex;
      justify-content: space-between;
      .layout-a{
        text-decoration: none;
        color: inherit;
        // padding: 0 14px;
        .layout-img {
          display: block;
          // width: 407px;
          // height: 229px;
          width: 300px;
          height: 168px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .layout-textbox{
          padding: 9px 10px;
          background-color: #f5f6fa;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          .layout-bot-title{
            display: flex;
            justify-content: space-between;
            .layout-bot-title-l{
              font-size: 18px;
              font-weight: bold;
              width: 245px;
              white-space: nowrap;//不换行
              overflow: hidden;
              text-overflow: ellipsis;//省略号
            }
            .layout-bot-title-r{
              font-size: 14px;
              line-height: 25px;
            }
          }
          .layout-bot-contnt{
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            .contnt-lfetbox{
              display: flex;
              .contnt-lfetbox-img{
                display: block;
                width: 20px;
                height: 20px;
                margin-right: 5px;
              }
              .contnt-lfetbox-text{
                font-size: 12px;
              }
            }
            .contnt-ringhbox{
              display: flex;
              .contnt-ringhbox-img{
                display: block;
                width: 20px;
                height: 20px;
                margin-right: 5px;
              }
              .contnt-ringhbox-text{
                font-size: 12px;
              }
            }
          }
          .layout-bot-competition{
            display: flex;
            .layout-bot-span{
              display: block;
              background-color: #e5e7ee;
              font-size: 12px;
              border-radius: 2px;
              margin-right: 8px;
              // height: ;
            }
          }
        }
      }
    }
  }
}
</style>