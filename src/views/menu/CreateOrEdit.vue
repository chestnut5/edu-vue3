<!--
 * @Author: zhangchen zhang1716680960@163.com
 * @Date: 2023-03-07 22:53:53
 * @LastEditors: zhangchen zhang1716680960@163.com
 * @LastEditTime: 2023-03-09 13:53:50
 * @FilePath: /源码笔记/Users/mac/Downloads/edu-vue3/edu-vue/src/views/menu/CreateOrEdit.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useMenus } from "@/composables/useMenus";

const { getAllMenus, topMenu } = useMenus();
getAllMenus();
</script>
<template>
  <h1></h1>
</template>

<style lang="less" scoped></style>
