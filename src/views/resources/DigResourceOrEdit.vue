<script lang="ts" setup>
import { ref, reactive } from "vue";
import { saveOrUpdate } from "@/api/rescources";
// 查询条件 查询结果 查询方法
import { queryResources } from "@/composables/useRecources";
//所有资源分类  获取所有分类的函数
import {
  allResourceCategory,
  dialogFormVisible,
  getAllResourceCategory,
} from "@/composables/useResourceCategory";
getAllResourceCategory();
// const dialogFormVisible = ref(false);
const initData = () => ({
  name: "",
  categoryId: 1,
  url: "",
  description: "",
});
//每次调用都是新的对象
const form = reactive(initData());
const formLabelWidth = "120px";

const isCreate = ref(true);
const msgText = ref("");
const initAndShow = (id = 0) => {
  Object.assign(form, initData());
  dialogFormVisible.value = true;
  if (id) {
    isCreate.value = false;
    msgText.value = "更新";
  } else {
    isCreate.value = true;
    msgText.value = "创建";
    return;
  }
};

defineExpose({
  initAndShow,
});

// 表单提交事件
const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(
    () => (dialogFormVisible.value = false)
  );
  queryResources();
  console.log(data);
};
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '资源'">
    <el-form :model="form">
      <el-form-item label="资源名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="资源路径" :label-width="formLabelWidth" prop="url">
        <el-input v-model="form.url" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="资源类别"
        :label-width="formLabelWidth"
        prop="categoryId"
      >
        <el-select v-model="form.categoryId" placeholder="资源类别">
          <!-- <el-option label="空" value="/" /> -->
          <el-option
            v-for="category in allResourceCategory"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="资源描述"
        :label-width="formLabelWidth"
        prop="description"
      >
        <el-input
          type="textarea"
          v-model="form.description"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit"> 确 认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
