<template>
  <WeChat style="margin-top: 50px" v-if="step === 1" @login="qwLogin" />
  <template v-else>
    <h5 class="tooltip">首次进入，请先完成账号绑定！</h5>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
      <el-form-item prop="account">
        <el-input v-model="loginForm.account" placeholder="请输入用户名">
          <template #prefix>
            <el-icon class="el-input__icon">
              <user />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password autocomplete="new-password">
          <template #prefix>
            <el-icon class="el-input__icon">
              <lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="login-btn">
      <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> 重置</el-button>
      <el-button :icon="Link" round size="large" type="primary" :loading="loading" @click="bind(loginFormRef)"> 绑定</el-button>
    </div>
  </template>
</template>
<script setup lang="ts">
import WeChat from "@/components/weChat/index.vue";
import { CircleClose, Link } from "@element-plus/icons-vue";
import { ElForm, ElMessage } from "element-plus";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { Login } from "@/api/interface";
import { bindQwApi, qwLoginApi } from "@/api/modules/login";
import { useLogin } from "../hooks/login";

type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const step = ref(1);
const loading = ref(false);
const loginRules = reactive({
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});
const loginForm = reactive<Login.ReqLoginForm>({
  account: "",
  password: "",
  qwUserId: ""
});
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const qwLogin = async (params: any) => {
  // params: { code: string; state: string; appid: string; source: string } // 企微登录参数所需
  const { data } = await qwLoginApi(params); // 登录，获取状态
  if (!data.bindQw) {
    // 1.未绑定账号
    step.value = 2;
    loginForm.qwUserId = data.qwUserId;
  } else {
    // 2.执行登录操作
    await useLogin(data);
  }
};
const bind = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      // 1.绑定账号
      const { data } = await bindQwApi(loginForm);
      if (data.bindQw) {
        // 2.执行登录操作
        await useLogin(data);
      } else {
        ElMessage.error("绑定失败!");
      }
    } finally {
      loading.value = false;
    }
  });
};
// 监听 enter 事件
onMounted(() => {
  // 监听 enter 事件（调用登录）
  document.onkeydown = (e: KeyboardEvent) => {
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return;
      bind(loginFormRef.value);
    }
  };
});
// 卸载事件
onBeforeUnmount(() => {
  document.onkeydown = null;
});
</script>
<style scoped lang="scss">
@import "../index";
</style>
