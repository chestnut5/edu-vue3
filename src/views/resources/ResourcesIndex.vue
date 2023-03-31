<script lang="ts" setup>
import {
  queryCondition,
  queriedResult,
  queryResources,
} from "@/composables/useRecources";
import {
  getAllResourceCategory,
  allResourceCategory,
} from "@/composables/useResourceCategory";
import { timeFormatter } from "@/utils/timeHandlers";
import { useRouter } from "vue-router";
import type { FormInstance } from "element-plus";
const router = useRouter();
queryResources();
getAllResourceCategory();
const queryFm = ref<FormInstance>();
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <el-form
        ref="queryFm"
        :inline="true"
        :model="queryCondition"
        class="demo-form-inline"
      >
        <el-form-item label="资源名称" prop="name">
          <el-input
            v-model="queryCondition.name"
            placeholder="请输入资源名称"
          />
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="queryCondition.url" placeholder="资源路径" />
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryld">
          <el-select v-model="queryCondition.categoryld" placeholder="资源分类">
            <el-option label="不限" value="/" />
            <el-option
              v-for="category in allResourceCategory"
              :label="category.name"
              :value="category.id"
              :key="category.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="" size="default" @click="queryFm?.resetFields()"
            >重置</el-button
          >

          <el-button type="primary" @click="queryResources()">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-button size="large">添加资源</el-button>
    <el-button size="large" @click="router.push({ name: 'resource-category' })"
      >资源类别</el-button
    >

    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column
        prop="name"
        label="资源名称"
        width="180"
        align="center"
      />
      <el-table-column prop="url" label="资源路径" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column
        prop="createTime"
        label="添加时间"
        align="center"
        :formatter="timeFormatter"
      />
      <el-table-column label="操作">
        <el-button type="primary" size="default" @click="">编辑</el-button>
        <el-button type="danger" size="default" @click="">删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
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

.el-table {
  margin-top: 17px;
}
// .box-card {
//   width: 480px;
// }
</style>
