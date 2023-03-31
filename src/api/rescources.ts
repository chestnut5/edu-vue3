import request from "@/utils/request";

type Common<T> = {
  code: string;
  data: T;
  mesg: string;
  time: string;
};

// 资源类型
type Resource = {
  categoryId: number;
  createdBy: string;
  createTime: string;
  description: string;
  id: number;
  operatorId: number | null;
  name: number;
  selected: boolean;
  updatedBy: string;
  updateTime: string;
  url: string;
};
export type QueriedResult = {
  current: number;
  hitCount?: boolean;
  optimizeCountSql?: boolean;
  orders?: any[];
  pages?: number;
  records: Resource[] | [];
  searchCount?: boolean;
  size: number;
  total: number;
};

// Partial ts 内置高级 将全员改成可选
export type Condition = Partial<{
  id: number;
  name: string;
  startCreateTime: string;
  url: string;
  categoryld: number | "";
  endCreateTime: string;
  current: number;
  size: number;
}>;
// 按条件分类查看资源
export const getResourcePages = (condition: Condition) => {
  return request<Common<QueriedResult>>({
    method: "POST",
    url: "/boss/resource/getResourcePages",
    data: condition,
  });
};
