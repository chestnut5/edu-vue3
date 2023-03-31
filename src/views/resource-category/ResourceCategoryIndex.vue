<script lang="ts" setup>
import { ref, reactive } from "vue";
import { timeFormatter } from "@/utils/timeHandlers";
import DigOrEdit from "./DigOrEdit.vue";
import {
  allResourceCategory,
  getAllResourceCategory,
  handleDelete,
} from "@/composables/useResourceCategory";
getAllResourceCategory();
console.log(allResourceCategory);
const dlgCreateOrEdit = ref<InstanceType<typeof DigOrEdit>>();
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h3>资源类别列表</h3>
        <el-button
          class="button"
          type="primary"
          @click="dlgCreateOrEdit?.initAndShow(0)"
          >创建类别</el-button
        >
      </div>
    </template>
    <el-table :data="allResourceCategory" border style="width: 100%">
      <el-table-column type="index" label="编号" align="center" />
      <el-table-column prop="name" label="类别名称" align="center" />
      <el-table-column
        prop="createdTime"
        :formatter="timeFormatter"
        label="创建时间"
        align="center"
      />
      <el-table-column prop="sort" label="排序" align="center" />
      <el-table-column label="操作" align="center" v-slot="{ row }">
        <el-button
          type="primary"
          size="default"
          @click="dlgCreateOrEdit?.initAndShow(row.id)"
          >编辑</el-button
        >
        <el-button type="danger" @click="handleDelete(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <DigOrEdit ref="dlgCreateOrEdit" />
    <!-- //2 使用并添加标识 -->
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

.box-card {
  width: auto;
}
</style>
