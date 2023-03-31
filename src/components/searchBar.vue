<script lang="ts" setup>
import { ref, reactive } from "vue";
let mag = ref();

const search = () => { };
</script>
<template>
  <div class="search-wrap">
    <slot></slot>
    <button class="search-button">搜索</button>
    <button class="reset-button">重置</button>
  </div>
</template>

<style lang="less" scoped>
.search-wrap {
  width: 600px;
  display: flex;
  box-shadow: 2px 3px 4px #9f9b9f;
  padding: 20px;
}

.search-item {
  margin-right: 15px;
}

// 低权值
// 预先放一下 调控类
input {
  width: 200px;
}

.mini-wrap {
  width: 200px;
}

button {
  bottom: none;
  color: white;
  padding: 4px 15px;
  cursor: pointer;
}

.search-wrap .search-button {}
</style>
