import { getResourcePages } from "@/api/rescources";
import type { Condition, QueriedResult } from "@/api/rescources";
// 查询条件 默认值
export const queryCondition = reactive<Condition>({
  name: "",
  url: "",
  categoryld: "",
  current: 1,
  size: 5,
});

// 查询结果 默认值
export const queriedResult = ref<QueriedResult>({
  current: 1,
  records: [],
  size: 0,
  total: 0,
});
// 查询方法
export const queryResources = async (params: Condition = {}) => {
  Object.assign(queryCondition, params); //两个对象的合并操作相同属性 相同属性进行覆盖
  const { data } = await getResourcePages(queryCondition);
  if (data.code === "000000") {
    queriedResult.value = data.data;
  } else {
    ElMessage.error("获取资源失败!!!");
    throw new Error("获取资源失败!!!");
  }
};
