<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";
import {
  form,
  isCreate,
  dialogFormVisible,
  onSubmit,
  msgText,
  allResourceCategory,
} from "@/composables/useResourceCategory";

const formLabelWidth = "140px";

const initAndShow = (id = 0) => {
  feResourceCategory.value?.resetFields();
  dialogFormVisible.value = true;

  if (id) {
    isCreate.value = false;
    msgText.value = "更新";
    //回显数据
    console.log("333333", allResourceCategory.value);

    const resourceCategory = allResourceCategory.value.find(
      (item) => item.id === id
    );
    console.log(resourceCategory);

    Object.assign(form, resourceCategory);
  } else {
    isCreate.value = true;
    msgText.value = "创建";
  }
};
const feResourceCategory = ref<FormInstance>();

// defineExpose显式地暴露
defineExpose({
  initAndShow,
});
</script>
<template>
  <ElDialog v-model="dialogFormVisible" :title="msgText + '资源类别'">
    <ElForm :model="form" ref="feResourceCategory">
      <ElFormItem label="类别名称" :label-width="formLabelWidth" prop="name">
        <ElInput v-model="form.name" autocomplete="off" />
      </ElFormItem>
      <ElFormItem label="排序" :label-width="formLabelWidth" prop="sort">
        <ElInput v-model="form.sort" autocomplete="off" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="dialogFormVisible = false">取消</ElButton>
        <ElButton type="primary" @click="onSubmit"> 提交 </ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<style lang="less" scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
