<template>
  <el-card v-bind="$attrs" class="chat-message">
    <div class="pos-r">
      <el-mention
        v-model="msg"
        ref="mentionRef"
        type="textarea"
        :prefix="['@', '#']"
        :whole="true"
        :options="options"
        placeholder="分享这一刻的想法…"
        @select="onSelect"
        :autosize="{ minRows: 3 }"
        :input-style="'padding-bottom:' + (height+20) + 'px;height:auto;box-sizing:content-box'"
      />
      <div
        ref="mentionContent"
        class="pos-a mention-content"
      >
        <img :src="preview" alt="" width="60" height="60" v-if="preview" />
        <slot></slot>
      </div>
    </div>
    <div>
      <div class="dflex margin-top-lg" style="justify-content: space-between">
        <div class="dflex">
          <div class="dflex margin-right" v-if="false">
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
          <div class="dflex margin-right">
            <el-upload
              style="display: contents"
              :on-change="onChange"
              ref="upload"
              :show-file-list="false"
              :accept="'image/*'"
              :multiple="false"
              :limit="1"
              :auto-upload="false"
            >
              <template #trigger>
                <img
                  src="/images/img.svg"
                  class="margin-right-xs"
                  alt="My Icon"
                  width="20"
                />图片
              </template>
            </el-upload>
          </div>
          <div
            class="dflex margin-right"
            @click="addMention"
            v-if="$attrs.messageType !== 'reply'"
          >
            <img
              src="/images/huati.svg"
              class="margin-right-xs"
              alt="My Icon"
              width="20"
            />话题
          </div>
          <div
            class="dflex"
            @click="addMention"
            v-if="$attrs.messageType === 'reply'"
          >
            <el-checkbox
              class="margin-right-xs"
              v-model="checked"
              label="同时转发"
            />
          </div>
        </div>
        <div class="dflex" aria-hidden="false">
          <el-dropdown @command="handleCommand" v-if="false">
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
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import Emoji from "./Emoji.vue";
import { getDynamicAdd } from "@/api/chat";
import { ElMessage, ElMention } from "element-plus";
import { getMention } from "@/api/chat";
import { useResizeObserver } from "@/hook";
const checked = ref(false);
const mentionRef = ref(null);
const options = ref([]);
const msg = ref("");
const props = defineProps(["actionType"]);
const fileList = ref([]);
const preview = ref(null);
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
let subjectId = ref("");
let onSelect = (option, prefix) => {
  console.log(option, prefix);
  subjectId.value = option.subjectId;
};
const mentionContent = ref(null);
const { width, height } = useResizeObserver(mentionContent);
const dropdownVal = ref(dropdownMenuList.value[0]);
const handleCommand = (command) => {
  dropdownVal.value = command;
};
const beforeUpload = (file) => {
  file["url"] = URL.createObjectURL(file.raw); // 创建临时URL
  console.log(file);
  fileList.value.push(file);
  return false;
};
const onChange = (file) => {
  file["url"] = URL.createObjectURL(file.raw); // 创建临时URL
  console.log(file);
  preview.value = file.url;
  fileList.value.push(file);
};
let emojiOnChange = (val, item) => {
  msg.value = `${msg.value}${val}`;
};
let addMention = async () => {
  await nextTick();
  mentionRef.value?.input.focus();
  msg.value = `${msg.value}#`;
};
let postSendMsgFn = () => {
  getDynamicAdd({
    comtent: msg.value,
    subjectId: subjectId.value,
  }).then((res) => {
    if (res.code == 200) {
      ElMessage({
        message: "发布成功",
        type: "success",
      });
    }
  });
};
onMounted(() => {
  getMention().then((res) => {
    options.value = res.data.map((item) => {
      return {
        subjectId: item.subjectId,
        value: item.subjectName,
        label: item.subjectName,
      };
    });
  });
});
</script>
<style lang="scss" scoped>
.chat-message {
}
.mention-content {
  bottom: 0px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
