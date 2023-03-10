<script lang="ts" setup>
// import type { ElAside } from "element-plus";
import { isCollapse } from "./isCollapse";
</script>
<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opened :collapse="isCollapse">
        <a href="/" class="logo">
          <img src="@/assets/logo.svg" alt="" />
          <h1>系统管理</h1>
        </a>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><IEpSetting />权限管理</el-icon>
          </template>
          <el-menu-item index="/menus">
            <el-icon><IEpSetting /></el-icon>
            <span>菜单列表</span>
          </el-menu-item>
          <el-menu-item index="/resources">
            <el-icon><IEpSetting /></el-icon>
            <span>资源列表</span>
          </el-menu-item>
          <el-menu-item index="/roles">
            <el-icon><IEpSetting /></el-icon>
            <span>角色列表</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="users">
          <el-icon>
            <IEpSetting />
          </el-icon>
          用户管理
        </el-menu-item>
        <el-menu-item index="course">
          <el-icon>
            <IEpSetting />
          </el-icon>
          课程管理
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><IEpSetting />广告管理</el-icon>
          </template>
          <el-menu-item index="/advertising">
            <el-icon><IEpSetting />广告列表</el-icon>
            <span></span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  background-color: #e9e9eb;
  height: 100vh;
  width: auto;
}
.el-menu {
  background-color: #e9e9eb;
  width: 200px;
  border-right: none;
  // .el-menu .el-menu--collapse & 同时
  &.el-menu--collapse {
    width: 80px;
    & h1 {
      display: none;
    }
  }
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  img {
    width: 32px;
    height: 32px;
  }
}
</style>
