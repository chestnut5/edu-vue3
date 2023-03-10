/*
 * @Author: zhangchen zhang1716680960@163.com
 * @Date: 2023-02-16 01:02:37
 * @LastEditors: zhangchen zhang1716680960@163.com
 * @LastEditTime: 2023-03-08 20:01:26
 * @FilePath: /源码笔记/Users/mac/Downloads/edu-vue3/edu-vue/src/api/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/api/index.ts

import { useTokenStore } from "@/stores/myToken";
import request from "../utils/request";

// 用户请求登录
//异步的请求
// 用户登录------参数类型
type LoginInfo = {
  phone: string;
  code?: string; //可选
  password: string;
};
// 提取公共的类型  <T = string> 默认值
type CommonReturn<T = string> = {
  success: boolean;
  state: number;
  message: string;
  content: T; //值的类型不固定 可变的使用泛型
};
// 用户登录---返回的数据类型
type LoginResult = CommonReturn<string>; //泛型
// type LoginResults = {
//   content: string;
//   success: boolean;
//   state: number;
//   message: string;
// };

//泛型 <T> 类型别名使用泛型 上面写的数量要和下面一一对应
export const login = (loginInfo: LoginInfo) => {
  return request<LoginResult>({
    method: "POST",
    url: "/front/user/login",
    data: `phone=${loginInfo.phone}&password=${loginInfo.password}`,
  });
};
/****
 * 要求请求类型 application/x-www/form-urlencoded
 *
 *   需要把数据拼接为             data: 属性1=值1&属性2=值2  不能有空格
 * 要求请求类型  application/json
 * 只需要把数据对象直接放在里面     data:loginInfo
 */

// type UserInfo = {
//   success: boolean;
//   message: string;
//   state: number;
//   content: {
//     isUpdatePassword: boolean;
//     portrait: string;
//     userName: string;
//   };
// };
type UserInfo = CommonReturn<{
  isUpdatePassword: boolean;
  portrait: string;
  userName: string;
}>; //泛型
export const getInfo = () => {
  return request<UserInfo>({
    method: "GET",
    url: "/front/user/getInfo",
  });
};
// 、、用户退出
export const logout = () => {
  return request({
    method: "POST",
    url: "/front/user/logout",
  });
};

// 刷新token query 使用 params

// type RToken = {
//   message: string;
//   state: number;
//   success: boolean;
//   content: string;
// };
type RToken = CommonReturn<string>;
let promiseRT: Promise<any>; //1.2 保存请求的promise对象
let isRefreshing = false; //1.1是否刷新中标志
export const refreshToken = () => {
  if (isRefreshing) {
    return promiseRT; //多次调用 始终返回之前的Promise对象
  }
  isRefreshing = true;
  promiseRT = request<RToken>({
    //2.1 把请求返回值保存到变量
    method: "POST",
    url: "/front/user/refresh_token",
    params: {
      refreshtoken: useTokenStore().token.refresh_token,
    },
  }).finally(() => {
    isRefreshing = false; //不可能一直返回之前的
  });
};
