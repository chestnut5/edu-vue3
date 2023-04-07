<script lang="ts" setup>
import zhCn from "element-plus/dist/locale/zh-cn";
import { RouterView } from "vue-router";
import Drawer from "./components/Drawer.vue";
const drawerRef = ref();

const confirm = () => {
  console.log(drawerRef.value);

  drawerRef.value.showLoading();

  setTimeout(() => {
    Promise.resolve(() => {}).finally(() => {
      ElMessage({
        message: "成功!",
        type: "success",
      });
      drawerRef.value.hideLoading();
      drawerRef.value.closeDrawer();
    });
  }, 2000);
};
const cancel = () => {
  ElMessage({
    message: "取消操作",
  });
  drawerRef.value.closeDrawer();
};
// 抽屉开关
const open = () => {
  drawerRef.value.openDrawer();
};
</script>
<template>
  <div m="1">此刻</div>

  <div class="i-ic-baseline-backspace text-3xl bg-green-500"></div>
  <el-button type="primary" size="default" @click="open">抽屉开关</el-button>

  <Drawer
    ref="drawerRef"
    size="80%"
    title="我要长高"
    @confirm="confirm"
    @cancel="cancel"
  >
    <template v-slot:form>
      <el-form>
        <el-form-item label="Activity name">
          <el-input />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker placeholder="Pick a time" style="width: 100%" />
          </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery">
          <el-switch />
        </el-form-item>
        <el-form-item label="Activity type">
          <el-checkbox-group>
            <el-checkbox label="Online activities" name="type" />
            <el-checkbox label="Promotion activities" name="type" />
            <el-checkbox label="Offline activities" name="type" />
            <el-checkbox label="Simple brand exposure" name="type" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
  </Drawer>
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<style lang="less" scoped></style>
