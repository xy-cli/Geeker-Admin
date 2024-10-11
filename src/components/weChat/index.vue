<template>
  <div class="weChat" v-loading="loading" element-loading-text="二维码生成中..." style="text-align: center">
    <el-loading></el-loading>
    <el-empty v-if="configDescription" :description="configDescription">
      <el-button
        style="width: 180px"
        :icon="Refresh"
        round
        size="large"
        type="primary"
        :loading="configDescription === '刷新中'"
        @click="refresh"
      >
        刷新
      </el-button>
    </el-empty>
    <div id="qr_login" v-else></div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, watch, ref } from "vue";
import { loadScript } from "@/utils";
import { useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getQwConfigApi } from "@/api/modules/login";
import { Refresh } from "@element-plus/icons-vue";

const route = useRoute();
const loading = ref(true);
const configDescription = ref("");
const query = computed(() => route.query);
const source = ref({
  source: "IMS"
});
const refresh = () => {
  configDescription.value = "刷新中";
  getCode();
};

const emit = defineEmits<{
  login: [value: any];
}>();

onMounted(async () => await getCode());

const getCode = async () => {
  await getQwConfigApi(source.value)
    .then(({ data }) => {
      const { origin, hash } = window.location;
      if (data) {
        configDescription.value = "";
        loadScript("https://rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js", () => {
          if ("WwLogin" in window) {
            window.WwLogin({
              id: "qr_login",
              appid: data.qwAppId || "",
              agentid: data.qwAgentId || "",
              redirect_uri: encodeURIComponent(origin + "/" + hash.split("?")[0] + "?source=" + source.value.source),
              state: data.state || ""
            });
          } else {
            ElNotification({
              title: "Error",
              message: "二维码生成失败，请刷新页面",
              type: "error"
            });
          }
        });
      }
    })
    .catch(err => {
      configDescription.value = err.message;
    })
    .finally(() => {
      loading.value = false;
    });
};

watch(
  () => query.value,
  newVal => {
    if (newVal.code && newVal.state) {
      qwLogin(newVal);
    }
  }
);
const qwLogin = async params => emit("login", params);
defineExpose({
  refresh
});
</script>

<style scoped lang="scss">
.weChat {
  min-height: 120px;
}
</style>
