import request from "@/utils/request";

type Common<T> = {
  code: string;
  data: T;
  mesg: string;
  time: string;
};

export type RescourceCategory = {
  createBy: string;
  createTime: string;
  id: number;
  name: string;
  operatorId: number | null;
  selected: boolean;
  sort: number;
  updatedBy: string;
  updatedTime: string;
};
// 获取所有资源类别信息
export const getAll = () => {
  // 他是一个保存资源类别信息的数组 RescourceCategory[]
  return request<Common<RescourceCategory[]>>({
    method: "GET",
    url: "/boss/resource/category/getAll",
  });
};
// Pick 想要那几个
type saveParams = Pick<RescourceCategory, "name" | "sort"> & { id?: number };
// 保存或更新资源类别
export const saveOrderUpdate = (data: saveParams) => {
  // 他是一个保存资源类别信息的数组 RescourceCategory[]
  return request({
    method: "POST",
    url: "/boss/resource/category/saveOrderUpdate",
    data,
  });
};

// 删除资源类别、
export const deleteCategory = (id: number) => {
  return request<Common<boolean>>({
    method: "DELETE",
    url: `/boss/resource/category/${id}`,
  });
};
