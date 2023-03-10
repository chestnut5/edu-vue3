<script lang="ts" setup>
import AppAside from "./AppAside.vue";
import AppHeader from "./AppHeader.vue";
</script>
<template>
  <div class="common-layout">
    <el-container>
      <AppAside />
      <el-container class="header-and-main">
        <AppHeader />
        <el-main>
          <el-scrollbar>
            <RouterView />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.header-and-main {
  flex-direction: column;
  height: 100vh;
}
.el-main {
  background-color: #f4f4f4;
  padding-right: 0;
}
</style>
