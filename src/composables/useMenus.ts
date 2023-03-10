import { getAll } from "@/api/menus";
import type { MenuItem, CreateOrEditMenu } from "@/api/menus";
// 导出
export function useMenus() {
  // 获取一级菜单
  // 1 先获取一级菜单
  //初始值的确是[]   但请把他理解成 MenuItem[] as 类型断言成自己想要的类型
  const allMenus = ref([] as MenuItem[]);
  const getAllMenus = async () => {
    const { data } = await getAll();
    if (data.code === "000000") {
      allMenus.value = data.data;
    } else {
      ElMessage.error("获取所有菜单失败----");
      throw new Error("获取所有菜单失败");
    }
  };
  // 2 再从所有菜单中获取二级菜单
  //computed 监听数据的变化
  const topMenu = computed(() => {
    return allMenus.value.filter((menu) => menu.level === 0);
  });

  // 表单的响应式数据
  const form = ref({} as CreateOrEditMenu);

  return {
    allMenus,
    topMenu,
    getAllMenus,
  };
  // 不能直接使用export  公共的内容可能会发生同时改变
}
