<script setup>
import { ref } from 'vue'
import { useUserStoreHook } from '@/store/modules/user';
import { message } from "@/utils/message";
import router from '@/router';

const loginFormRef = ref()
const loginForm = ref({
  username: '1@1.com',
  password: '123456',
})
const loading = ref(false)

const rules = ref({
  username: [{ required: true, type: 'email', message: '请输入邮箱地址', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', min: 6, max: 15, trigger: 'blur' }],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const { username, password } = loginForm.value
      loading.value = true
      console.log('登陆1');
      //调用公共方法登陆
      useUserStoreHook().loginByUsername({ username, password }).then(res => {
        console.log('登陆2');
        if (res.message === 'SUCCESS') {
          // message("登录成功", { type: "success" });
          // router.push('/home')
        } else {
          message("登录失败", { type: "error" });
        }
      }).finally(() => (
        loading.value = false
      ));
    } else {
      console.log('error submit!')
    }
  })
}

</script>

<template>
  <div class="container">
    <img class="logo" src="/public/vite.svg" alt="logo" />
    <el-form ref="loginFormRef" style="max-width: 600PX;width: 250PX;" :model="loginForm" status-icon :rules="rules"
      label-width="50px">
      <el-form-item prop="username">
        <el-input class="input_item" v-model="loginForm.username" placeholder="username" type="email" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="input_item" v-model="loginForm.password" placeholder="password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button class="input_item" type="primary" style="width: 250PX;" @click="submitForm(loginFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.container{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  

  .logo{
    width: 50PX;
    margin-bottom: 40PX;
  }

  .input_item{
    height: 36PX;
  }
  

  .el-button:hover{
    background-color: #F70;
  }
}
</style>
