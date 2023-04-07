<script lang="ts" setup>
import { ref, reactive } from "vue";
defineProps({
  size: {
    default: "45%",
  },
  title: {
    default: "默认标题",
  },
  direction: {
    default: "rtl",
  },
});
//暴露出去 自定义事件
const emit = defineEmits(["confirm", "cancel"]);
let drawer = ref(false);
// 加载状态

let loading = ref(false);

//按钮组
const confirm = () => emit("confirm");

const cancel = () => emit("cancel");
// 加载状态
const showLoading = () => {
  loading.value = true;
};
const hideLoading = () => {
  loading.value = false;
};
// 抽屉开关
const openDrawer = () => (drawer.value = true);
const closeDrawer = () => (drawer.value = false);

// 暴露出去 不然是用不了
defineExpose({
  showLoading,
  hideLoading,
  closeDrawer,
  openDrawer,
  confirm,
  cancel,
});
</script>
<template>
  <div>
    <el-drawer
      v-model="drawer"
      :size="size"
      :title="title"
      :close-on-click-modal="false"
    >
      <div class="form">
        <div class="body">
          <!-- 插槽 -->

          <slot name="form"> </slot>
          <!-- 插槽 -->
        </div>
        <div class="btns">
          <el-button
            type="primary"
            size="default"
            @click="confirm"
            :loading="loading"
            >确认</el-button
          >
          <el-button size="default" @click="cancel">取消</el-button>
        </div>
      </div></el-drawer
    >
  </div>
</template>

<style lang="less" scoped>
.form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.form .body {
  flex: 1;
  overflow-y: scroll;
}
</style>
