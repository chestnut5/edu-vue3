<!--
 * @Author: zhangchen zhang1716680960@163.com
 * @Date: 2023-03-10 12:07:22
 * @LastEditors: zhangchen zhang1716680960@163.com
 * @LastEditTime: 2023-03-10 12:56:00
 * @FilePath: /源码笔记/Users/mac/Downloads/edu-vue3/src/views/menu/CreateOrEdit.vue
 * @Description:编辑新增菜单页面
-->
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useMenus } from "@/composables/useMenus";
import { useRoute } from "vue-router";
const { getAllMenus, topMenus, form, onSubmit, getMenuInfoById, msgText } =
  useMenus();
getAllMenus();
const route = useRoute();
console.log(route.params.id);

// 接收到编辑页面的id
getMenuInfoById(route.params.id as string);
</script>
<template>
  <h1>{{ msgText }}</h1>
  <el-form :model="form" label-width="120px" size="large">
    <el-form-item label="菜单名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="菜单路径">
      <el-input v-model="form.href" />
    </el-form-item>
    <el-form-item label="上级菜单">
      <el-select v-model="form.parentId" placeholder="请选择菜单">
        <el-option label="顶级菜单" :value="-1" />
        <el-option
          v-for="menu in topMenus"
          :key="menu.id"
          :label="menu.name"
          :value="menu.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.description" type="textarea" />
    </el-form-item>
    <el-form-item label="图标名称">
      <el-input v-model="form.icon" />
    </el-form-item>
    <el-form-item label="是否显示">
      <el-radio-group v-model="form.shown">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="form.orderNum" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即{{ msgText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped>
.el-form {
  background-color: #fff;
  padding: 70px;
}
</style>
