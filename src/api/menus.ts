/*
 * @Author: zhangchen zhang1716680960@163.com
 * @Date: 2023-03-06 11:10:35
 * @LastEditors: zhangchen zhang1716680960@163.com
 * @LastEditTime: 2023-03-10 10:55:32
 * @FilePath: /源码笔记/Users/mac/Downloads/edu-vue3/edu-vue/src/api/menus.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "../utils/request";

// 使用类型别名 定义类型、
type Common<T> = {
  code: string;
  data: T;
  mesg: string;
  time: string;
};
export type MenuItem = {
  createBy: string;
  createTime: string;
  description: string;
  href: string;
  icon: string;
  id: number;
  level: number;
  name: string;
  operatorId: number | null;
  orderNum: number;
  parentId: number;
  shown: boolean;
  updatedBy: string;
  updateTime: string;
};
//表明里面保存的是元素MenuItem的数组
// Array<MenuItem> 或者 MenuItem[]

// 获取所有菜单项
export const getAll = () => {
  return request<Common<MenuItem[]>>({
    method: "GET",
    url: "/boss/menu/getAll",
  });
};
// Partial ts 内置高级 将全员改成可选
// type CreateOrEditMenu = Partial<MenuItem>;

// Pick 从类型定义T的属性中，选取指定一组属性，返回一个新的类型定义。
export type CreateOrEditMenu = Pick<
  MenuItem,
  "parentId" | "name" | "href" | "icon" | "orderNum" | "description" | "shown"
> & { id?: number }; //编辑时才有id  &拼接
// & 在复合类型进行拼接

// 不要那几个 Omit
// type CreateOrEditMenu = Omit<
//   MenuItem,
//   "createBy" | "createTime" | "level" | "open" | "updateTime"
// >;

// 保存或新赠菜单 编辑菜单才有 id
export const saveOrUpdate = (menuInfo: CreateOrEditMenu) => {
  return request({
    method: "POST",
    url: "/boss/menu/saveOrUpdate",
    data: menuInfo,
  });
};
