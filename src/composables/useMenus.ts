import { getAll, saveOrUpdate, deleteMenu } from "@/api/menus";
import type { MenuItem, CreateOrEditMenu } from "@/api/menus";
import router from "@/router/index";
// 导出
export function useMenus() {
  // 1 先获取一级菜单      初始值的确是[]   但请把他理解成 MenuItem[] as 类型断言成自己想要的类型
  //  获取列表信息
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
  // 2 再从所有菜单中获取二级菜单   computed 监听数据的变化

  const topMenus = computed(() => {
    return allMenus.value.filter((menu) => menu.level === 0);
  });

  // 表单的响应式数据 设置表单默认值
  const form = ref<CreateOrEditMenu>({
    name: "",
    href: "",
    parentId: -1,
    description: "",
    icon: "",
    shown: true,
    orderNum: 0,
  });

  // 表单提交事件
  const onSubmit = async () => {
    const { data } = await saveOrUpdate(form.value);
    if (data.code === "000000") {
      ElMessage.success("添加菜单成功----");
      router.push({ name: "menus" });
    } else {
      ElMessage.error("添加菜单失败----");
      throw new Error("添加菜单失败");
    }
    console.log(data);
  };

  // 删除菜单的事件处理函数

  const handleDelete = async (id: string) => {
    await ElMessageBox.confirm("确定要删除该菜单吗?", "删除提醒", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    }).catch(() => {
      // 如果取消
      ElMessage.info("删除操作被取消");
      return new Promise(() => {}); //pendding
    });

    //调用接口函数
    const { data } = await deleteMenu(id);
    if (data.code === "000000" && data.data) {
      //删除成功重新获取列表信息
      getAllMenus();
    } else {
      ElMessage.error("删除菜单失败");
      throw new Error("删除菜单失败");
    }
  };

  // 编辑 封装 根据id获取菜单信息
  const getMenuInfoById = (id: string) => {
    // 通过接口获取数据
  };

  return {
    allMenus,
    topMenus,
    getAllMenus,
    form,
    onSubmit,
    handleDelete,
    getMenuInfoById,
  };
  // 不能直接使用export  公共的内容可能会发生同时改变
}
