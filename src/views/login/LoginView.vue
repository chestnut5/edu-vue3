<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";
import { ref, reactive } from "vue";
import { login } from "@/api/users";
import { useRouter, useRoute } from "vue-router";
// 1 导入token相关函数
import { useTokenStore } from "@/stores/myToken";
const router = useRouter();
const route = useRoute();
// 2调用函数 得到对象
//  const {token} =useTokenStore() 解构会失去响应式 当然也可以包一层 storeToRefs(store)
const stores = useTokenStore();
// form表单必须是响应式–
const form = reactive({
  phone: "18201288771",
  password: "111111",
});

//表单实例
const formRef = ref<FormInstance>();
//表单校验规则
const rules = reactive<FormRules>({
  phone: [
    {
      required: true,
      message: "请输入电话号码",
      trigger: "blur",
    },
    {
      pattern: /^1\d{10}$/,
      message: "必须是11位数字",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      min: 6,
      max: 18,
      message: "密码长度需要6到18位",
      trigger: "blur",
    },
  ],
});
// 定义是否在加载中
const isLoading = ref(false);
// 登录事件处理
const onSubmit = async () => {
  isLoading.value = true; //刚开始忙 3.1 开始请求 置为true
  //表单校验
  await formRef.value?.validate().catch((err) => {
    ElMessage.error("表单校验失败---");
    //保持错误状态
    isLoading.value = false; //3.3验证失败置为false
    throw err;
  });

  // 正式的发送请求
  const data = await login(form).then((res) => {
    if (!res.data) {
      ElMessage.error("登录信息有误");
      isLoading.value = false; //3.4登录失败置为false
      throw new Error("登录信息有误");
    }
    return res.data;
  });
  console.log(data);

  //  保存token
  stores.saveToken(data.content);
  isLoading.value = false; //后面不忙 3.2结束请求 置为false
  ElMessage.success("登录成功");
  router.push((route.query.redirect as string) || "/");
};
</script>
<template>
  <div class="login">
    <el-form
      :model="form"
      label-position="top"
      label-width="80px"
      :rules="rules"
      ref="formRef"
      :inline="false"
      size="large"
    >
      <h2>登录</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading"
          >立即创建</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.login {
  background-color: #ccc;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    width: 300px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    .el-form-item {
      margin-top: 20px;
    }
    .el-button {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
