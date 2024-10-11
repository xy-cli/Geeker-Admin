<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <SwitchDark class="dark" />
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-form-tabs">
          <div
            v-for="item in tabs"
            :key="item.label"
            class="login-form-tabs-item"
            :class="{ active: activeName === item.component }"
            @click="tabsChange(item.component)"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="login-form-box">
          <component :is="activeName" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import type { Component } from "vue";
import AccountLogin from "./components/accountLogin.vue";
import WeChatLogin from "./components/weChatLogin.vue";
import SwitchDark from "@/components/SwitchDark/index.vue";
const activeName = shallowRef<Component>(AccountLogin);
const tabs = [
  { label: "账密登录", component: AccountLogin },
  { label: "企微登录", component: WeChatLogin }
];
const tabsChange = (component: Component) => (activeName.value = component);
</script>

<style scoped lang="scss">
@import "./index";
</style>
