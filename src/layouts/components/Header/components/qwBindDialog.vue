<template>
  <el-dialog destroy-on-close v-model="dialogVisible" title="绑定企微" width="500px" draggable>
    <WeChat ref="weChat" @login="qwLogin" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WeChat from "@/components/weChat/index.vue";
import { bindQwApi } from "@/api/modules/login";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/modules/user";
const userStore = useUserStore();
const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};
const weChat = ref<InstanceType<typeof WeChat> | null>(null);
const qwLogin = async (params: any) => {
  // params: { code: string; state: string; appid: string; source: string } // 企微登录参数所需
  // 1.绑定账号
  await bindQwApi(params)
    .then(({ data }) => {
      if (data?.bindQw) {
        userStore.setToken(data.token);
        // 更新用户信息
        userStore.setUserInfo({
          userName: data.userName,
          avatar: data.avatar,
          bindQw: data.bindQw
        });
        dialogVisible.value = false;
        ElMessage.success("绑定成功！");
      } else {
        weChat.value?.refresh();
      }
    })
    .catch(() => {
      dialogVisible.value = false;
    })
    .finally(() => {
      const { origin, hash } = window.location;
      // 重定向
      window.location.replace(`${origin}/${hash.split("?")[0]}`);
    });
};

defineExpose({ openDialog });
</script>
