<template>
  <div class="footer flx-center">
    <a target="_blank"> 2024 © 玛特宇宙 - {{ title }}</a>
  </div>
</template>
<script setup lang="ts">
const title = import.meta.env.VITE_GLOB_APP_TITLE;
</script>
<style scoped lang="scss">
@import "./index";
</style>
