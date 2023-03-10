<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useMenus } from "@/composables/useMenus";
const router = useRouter(); //  路由跳转

const { allMenus, getAllMenus } = useMenus();
getAllMenus();
</script>
<template>
  <h1>菜单列表</h1>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button
            type="primary"
            @click="router.push({ name: 'menu-create' })"
            >添加菜单</el-button
          >
        </div>
      </template>

      <el-table :data="allMenus" border style="width: 100%">
        <el-table-column align="center" type="index" prop="date" label="序号" />
        <el-table-column align="center" prop="name" label="菜单名称" />
        <el-table-column align="center" prop="level" label="菜单层级" />
        <el-table-column align="center" prop="icon" label="菜单图标" />
        <el-table-column align="center" prop="orderNum" label="排序" />
        <el-table-column align="center" label="操作">
          <el-button type="primary" size="default">编辑</el-button>
          <el-button type="danger" size="default">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}
</style>
