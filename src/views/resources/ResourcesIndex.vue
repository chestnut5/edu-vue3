<script lang="ts" setup>
// 导入 删除资源的接口
import { deleteResource } from "@/api/rescources";
// 查询条件 查询结果 查询方法
import {
  queryCondition,
  queriedResult,
  queryResources,
} from "@/composables/useRecources";
// 所有分类信息 查询所有分类信息
import {
  getAllResourceCategory,
  allResourceCategory,
} from "@/composables/useResourceCategory";
// 格式化时间
import { timeFormatter } from "@/utils/timeHandlers";
// 用户路由跳转
import { useRouter } from "vue-router";
// 表单类型
import type { FormInstance } from "element-plus";
// 导入创建或更新对话框
import DigResourceOr from "./DigResourceOrEdit.vue";
const router = useRouter();
queryResources(); //根据条件获取所有资源
getAllResourceCategory(); //获取所有资源分类
const queryFm = ref<FormInstance>(); //表单引用
const dlgCreateOrEdit = ref<InstanceType<typeof DigResourceOr> | null>(null); //对话框组件引用

// 删除资源
const handleDelete = async (id: number) => {
  await ElMessageBox.confirm("确定要删除吗？", "删除询问", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).catch(() => {
    ElMessage.info("删除动作被取消");
    return new Promise(() => {});
  });
  //确认后进行真正的删除请求  调接口

  const { data } = await deleteResource(id);
  if (data.code === "000000") {
    ElMessage.success("删除资源成功");
    queryResources({ current: 1 }); //根据条件获取所有资源
  } else {
    ElMessage.error("删除资源失败");
  }
};
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
    <el-button size="large" @click="dlgCreateOrEdit?.initAndShow()"
      >添加资源</el-button
    >
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
      <el-table-column label="操作" v-slot="{ row }">
        <el-button type="primary" size="default">编辑</el-button>
        <el-button type="danger" size="default" @click="handleDelete(row.id)"
          >删除</el-button
        >
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="queriedResult.size"
      :page-sizes="[5, 10, 20, 30]"
      layout="total,sizes, prev, pager, next,jumper"
      :total="queriedResult.total"
      :current-page="queriedResult.current"
      @size-change="
        (size) => {
          queryResources({ size });
        }
      "
      @current-change="
        (current) => {
          queryResources({ current });
        }
      "
    />
    <DigResourceOr ref="dlgCreateOrEdit" />
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
