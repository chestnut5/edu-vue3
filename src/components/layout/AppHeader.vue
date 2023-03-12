<!--
 * @Author: zhangchen zhang1716680960@163.com
 * @Date: 2023-02-15 22:30:12
 * @LastEditors: zhangchen zhang1716680960@163.com
 * @LastEditTime: 2023-03-09 11:13:42
 * @FilePath: /源码笔记/Users/mac/Downloads/edu-vue3/edu-vue/src/components/layout/AppHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
import { useTokenStore } from "@/stores/myToken";
import { isCollapse } from "./isCollapse";
import { useRouter } from "vue-router";
import { getInfo, logout } from "@/api/users";

const router = useRouter();
//先给空值 然后再调接口去获取数据 （思想)
const userInfo = ref({ portrait: "", userName: "" });
// 退出事件处理
getInfo().then((res) => {
  userInfo.value = res.data.content;
  console.log(userInfo.value);
});
// getInfo().then((res) => {
//   userInfo.value = res.data.content;
//   console.log(userInfo.value);
// });
const handleLogout = async () => {
  //1 询问，确认 点确认 返回成功Promise
  await ElMessageBox.confirm("确认要退出登录？", "退出询问", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  }).catch(() => {
    ElMessage.info("取消退出操作");
    return new Promise(() => {}); //取消退出操作 阻止代码向后执行
  });

  // 2 执行退出
  await logout().catch(() => {}); //告诉服务器准备退出了
  ElMessage.success("用户成功登出");
  // 3 清空token 跳转到login
  useTokenStore().saveToken(""); //清除token
  router.push({ name: "login" }); //跳转到登录页面login
};
</script>
<template>
  <el-header>
    <!-- 图标 -->
    <el-icon @click="isCollapse = !isCollapse">
      <IEpExpand v-show="isCollapse" />
      <IEpFold v-show="!isCollapse" />
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="/">promotion management</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下拉菜单 -->

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="36" :src="userInfo.portrait" />
        <el-icon class="el-icon--right">
          <IEpArrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item> {{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style lang="less" scoped>
//头部内容水平居中 垂直居中 图标右边距 ，下拉按钮右对齐
.el-header {
  display: flex;
  align-items: center;
  background-color: #dedfe0;

  .el-icon {
    margin-right: 17px;
  }
}
.el-dropdown {
  margin-left: auto;
  .el-dropdown-link {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
