<template>
  <div class="chat-message">
    <el-card>
      <el-input
        v-model="msg"
        type="textarea"
        placeholder="分享这一刻的想法…"
        :autosize="{ minRows: 3 }"
        @click=""
      />
      <div>
        <div class="dflex margin-top-lg" style="justify-content: space-between">
          <div class="dflex">
            <div class="dflex margin-right">
              <el-popover placement="bottom" trigger="click" width="auto">
                <template #reference>
                  <span class="dflex">
                    <img
                      src="/images/emio.svg"
                      class="margin-right-xs"
                      alt="My Icon"
                      width="20"
                    />表情
                  </span>
                </template>
                <template #default>
                  <div style="height: 200px; overflow-y: auto">
                    <Emoji @onChange="emojiOnChange" />
                  </div>
                </template>
              </el-popover>
            </div>
            <div class="dflex" v-if="false">
              <img
                src="/images/img.svg"
                class="margin-right-xs"
                alt="My Icon"
                width="20"
              />图片
            </div>
          </div>
          <div class="dflex" aria-hidden="false">
            <el-dropdown @command="handleCommand" :aria-hidden="false">
              <div class="dflex" style="font-size: 18px" aria-hidden="false">
                {{ dropdownVal.title
                }}<el-icon class="margin-left">
                  <CaretBottom />
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    :command="item"
                    v-for="item in dropdownMenuList"
                    :key="item.value"
                    style="width: 130px"
                    >{{ item.label }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button type="primary" class="margin-left" @click="postSendMsgFn"
              >发布</el-button
            >
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Emoji from "./Emoji.vue";
import { postSendMsg } from "@/api/chat";
import { ElMessage } from "element-plus";
const msg = ref("");
const dropdownMenuList = ref([
  {
    label: "公开",
    value: "key_1",
    title: "公开",
  },
  {
    label: "仅粉丝可见",
    value: "key_2",
    title: "粉丝",
  },
  {
    label: "仅互关好友可见",
    value: "key_3",
    title: "好友",
  },
  {
    label: "仅钻粉可见",
    value: "key_4",
    title: "钻粉",
  },
  {
    label: "仅自己可见",
    value: "key_5",
    title: "私密",
  },
]);
const dropdownVal = ref(dropdownMenuList.value[0]);
const handleCommand = (command) => {
  dropdownVal.value = command;
};
let emojiOnChange = (val, item) => {
  console.log(val, item);
  msg.value = `${msg.value}${val}`;
};
let postSendMsgFn = () => {
  postSendMsg({
    content: msg.value,
    type: dropdownVal.value.value,
  }).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: "发布成功",
        type: "success",
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.chat-message {
}
</style>
