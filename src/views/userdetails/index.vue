<template>
  <div class="user_namebox">
    <div class="user-navbox">
      <div class="user-nav">
        <div class="left-userInformation">
          <span class="avatar-span">
            <img class="avatar-img" :src="avatar" alt="">
          </span>
          <div class="userInfor-name">{{nick}}</div>
          <div class="userInfor-boxid">
            <div class="userInfor-text">账号ID：</div>
            <div class="userInfor-id">{{ uid }}</div>
          </div>
          <!-- <div v-show="wxName == undefined && bindStatus == false || wxName == null && bindStatus == false || wxName == '' && bindStatus == false" class="bind-account"> -->
          <div v-show="wxName == undefined || wxName == null  || wxName == '' " class="bind-account">
            <div class="bind-account-text">未绑定账号</div>
            <div class="bind-account-butt" @click="bindThirdParty">绑定</div>
          </div>
          <div v-show="wxName !== '' " class="bind-account">
            <div class="bind-account-text">第三方账号</div>
            <div class="bind-account-dsfzh">{{ wxName }}</div>
          </div>
        </div>
        <div class="right-userTable">
          <div class="right-wdfd">我的福袋</div>
          <div class="right-xhx"></div>
 
          <el-table class="custom-table" :data="tableData" stripe>
            <el-table-column prop="title" label="福袋名称"/>
            <el-table-column prop="bagName" label="福袋类型"/>
            <el-table-column label="兑换码">
              <template v-slot="scope">
                <div class="getCode-cell">
                  <span>{{ scope.row.getCode }}</span>
                  <span class="copy-fz" type="text" :data-clipboard-text="scope.row.getCode" @click="copyToClipboard(scope.row.getCode)">复制</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="有效期"/>
            <el-table-column label="状态">
              <template v-slot="scope">
                <span :style="getStatusStyle(scope.row.status)">{{ getStatusText(scope.row.status) }}</span>
              </template>
            </el-table-column>

            <!-- 自定义无数据时的内容 -->
            <template v-slot:empty>
              <div class="custom-empty">
                <p>暂无数据</p>
              </div>
            </template>
          </el-table>
        </div>
      </div>
    </div>

    <!-- 绑定第三方账户弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="绑定账户" width="250">
      <el-input v-model="thirDpartyName" maxlength="20" placeholder="请输入第三方账户" clearable autocomplete="off" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitDialog">绑定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useUserStoreHook } from '@/store/modules/user';
const userStore = useUserStoreHook();
import { computed,onMounted,ref,onUnmounted,watch,onBeforeUnmount  } from 'vue';
import { getBindingAccountList,getReceiveRecordList } from '@/api/userdetails';
import ClipboardJS from 'clipboard';//第三方复制剪切板插件
const thirDpartyName = ref('');//输入第三方账户名称
const dialogFormVisible = ref(false);//显示隐藏账户
//用户头像
const avatar = computed(() => {
  return userStore.avatar
});
//用户名字
const nick = computed(() => {
  return userStore.nick
});
//用户id
const uid = computed(() => {
  return userStore.uid
});
//第三方用户名称
const wxName = computed(() => {
  return userStore.wxName
});
// 监听 wxName 的变化
watch(wxName, (newVal) => {
  console.log('获取wxName赋值后的值', newVal);
});
//绑定第三方账户=弹窗
const bindThirdParty = () => {
  dialogFormVisible.value = true;
}
//绑定第三方账户接口
const isVisible = ref(false);
const bindStatus = ref(false);//true为绑定成功
const submitDialog = () => {
  //不允许多次触发
  if(isVisible.value == true){
    return
  }
  if (thirDpartyName.value == '') {
    return
  }
  // 设置 isVisible 为 true，表示正在处理
  isVisible.value = true;
  let param = {
    thirdAccount:thirDpartyName.value
  }
  const needToken = true; // 根据实际需要设置是否需要token
  getBindingAccountList(param,needToken).then(res => {
    console.log('绑定第三方返回数据',res);
    if(res.code == 200){
      bindStatus.value = res.data.status;
      userStore.SET_WXNAME(res.data.wxName); // 更新 wxName 的值
    }
    setTimeout(() => {
      isVisible.value = false;
    }, 2000);
  }).catch(error => {
    console.log(error)
  });
}
//时间戳格式化年月日 时分秒
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};
//领取记录接口
const tableData = ref([]);
const getReceiveRecordData = () => {
  let param = {
    type:1,
    pageNum:1,
    pageSize:100,
  }
  const needToken = true; // 根据实际需要设置是否需要token
  getReceiveRecordList(param,needToken).then(res => {
    console.log('领取记录数据返回',res);
     // 格式化 createTime 字段
    tableData.value = res.data.map(item => ({
      ...item,
      createTime: formatTimestamp(item.createTime),
    }));
  }).catch(error => {
    console.log(error)
  });
}
//枚举值转成对应中文
const getStatusText = (status) => {
  switch (status) {
    case 0:
      return '未领取';
    case 1:
      return '已领取';
    case 2:
      return '已兑换';
    case 3:
      return '已取消';
    default:
      return '未知状态';
  }
};
//0未领取颜色为红色
const getStatusStyle = (status) => {
  if (status === 0) {
    return { color: '#FF4C4C' }; // 未领取颜色
  }
  return {};
};
//复制功能
const copyToClipboard = (event) => {
  // 这里不需要做任何事，clipboard.js 会自动处理复制
  console.log('复制按钮点击',event);
};
let clipboard;
onMounted(() => {
  console.log('用户信息第三方账号', userStore.wxName)
  console.log('用户信息第三方账号 (computed)', wxName.value);
  getReceiveRecordData();
  // 初始化 ClipboardJS
  clipboard = new ClipboardJS('.copy-fz[data-clipboard-text]');
  clipboard.on('success', (e) => {
    // console.log('复制成功:', e.text);
    e.clearSelection();
  });
  clipboard.on('error', (e) => {
    console.error('复制失败:', e);
  });
})

onBeforeUnmount(() => {
  // 在组件销毁前清理 ClipboardJS 实例
  if (clipboard) {
    clipboard.destroy();
  }
});

</script>
<style lang="scss" scoped>
.user_namebox{
  width: 100%;
  height: 100vh;
  // height: calc(100vh - 0px);
  background-color: #fff;
  .user-navbox{
    width: 100%;
    height: 100%;
    .user-nav{
      padding: 40px 280px 0 280px;
      box-sizing: border-box;/* 确保 padding 包含在宽度内 */
      width: 100%;
      height: 100%;
      display: flex;
      .left-userInformation{
        // width: 1.533rem;
        width: 17.5%;
        height: 535px;
        margin-right: 10px;
        border: 1px solid #E5E4E4;
        border-radius: 8px;

        padding: 40px 24px 0 24px;
        box-sizing: border-box;
        .avatar-span{
          display: block;
          // width: 100%;
          // height: 100%;
          .avatar-img{
            display: block;
            width: 0.41667rem;
            height: 0.41667rem;
            margin-left: 0.29167rem;
            border-radius: 50%;
            margin-bottom: 0.10417rem;
          }
        }
        .userInfor-name{
          text-align: center;
          color: #090E16;
          font-size: 0.10417rem;
        }
        .userInfor-boxid{
          display: flex;
          justify-content: center;
          margin-top: 6px;
          margin-bottom: 27px;
          .userInfor-text{
            font-size: 14px;
            color: #090E16;
            opacity: 0.5;
          }
          .userInfor-id{
            font-size: 14px;
            color: #090E16;
            opacity: 0.5;
          }
        }
        .bind-account{
          display: flex;
          justify-content: space-between;
          .bind-account-text{
            font-size: 14px;
            color: #090E16;
          }
          .bind-account-butt{
            // display: block;
            font-size: 14px;
            color: #FF4C4C;
            // text-decoration: none;
            cursor: pointer; /* 设置鼠标指针效果 */
            transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */
          }
          .bind-account-dsfzh{
            font-size: 14px;
            color: #090E16;
          }
        }
      }
      .right-userTable{
        width: 81.5%;
        height: 535px;
        border: 1px solid #E5E4E4;
        border-radius: 8px;
        padding: 20px 30px 43px 30px;
        box-sizing: border-box;
        // overflow-x: hidden; /* 防止水平滚动条 */
        .right-wdfd{
          font-size: 16px;
          color: #090E16;
          opacity: 0.5;
          margin-bottom: 20px;
        }
        .right-xhx{
          border: #E5E4E4 solid 0.5px;
          margin-bottom: 24px;
        }
        .custom-table{
          width: 100%;
          // height: 405px;
          height: 405px;
          border: 1px solid #F2F2F4;
          border-radius: 6px;
          box-sizing: border-box;
          .getCode-cell {
            display: flex;
            align-items: center;
            .copy-fz{
              display: block;
              font-size: 14px;
              color: #090E16;
              opacity: 0.5;
              margin-left: 6px;
              cursor: pointer; /* 设置鼠标指针效果 */
             transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */
            }
          }
          .custom-empty {
            text-align: center;
            color: #999;
            padding: 20px;
          }
        }
      }
    }
  }
}
</style>