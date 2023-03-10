/*
 * @Author: zhangchen zhang1716680960@163.com
 * @Date: 2023-02-24 14:02:55
 * @LastEditors: zhangchen zhang1716680960@163.com
 * @LastEditTime: 2023-03-08 19:10:31
 * @FilePath: /源码笔记/Users/mac/Downloads/edu-vue3/edu-vue/src/stores/myToken.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";

interface Token {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  user_id: string;
}
export const useTokenStore = defineStore("myToken", () => {
  ///ref 相当于 state  token  返回的是一个字符串 JSON
  const tokenJson = ref("");

  // computed 相当于 getter
  const token = computed<Token>(() => {
    //try catch  防止报错
    try {
      // 2 pinia 中为空时 尝试从localStorage 中读取

      return JSON.parse(
        tokenJson.value || window.localStorage.getItem("TokenInfo") || "{}"
      );
    } catch (err) {
      ElMessage.error("json字符串跟格式不对,转化对象时失败----"); //3 如果localStorage 中数据转对象失败 就清空他
      window.localStorage.setItem("TokenInfo", "");
      throw err;
    }
  });

  // function 相当于 actions
  function saveToken(data: string) {
    tokenJson.value = data;
    window.localStorage.setItem("TokenInfo", data); //1 存储到pinia的同时 ，保存到localStorage
  }

  // 向外暴露
  return {
    token,
    saveToken,
  };
});
