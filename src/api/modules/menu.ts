// import authMenuList from "@/assets/json/authMenuList2.json";
import http from "@/api";

// 获取菜单列表
export const getMenuApi = () => {
  return http.post<Menu.MenuAll[]>("/admin/menu/tree", {}, { loading: true });
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
  // return authMenuList;
};
// 保存菜单
export const saveMenuApi = (params: Menu.MenuAll) => {
  return http.post<Menu.MenuAll[]>("/admin/menu/save", params, { loading: false });
};
// 删除菜单
export const removeMenuApi = (params: { id: number | string }) => {
  return http.post<Menu.MenuAll[]>("/admin/menu/remove", params, { loading: false });
};

// 获取菜单权限列表
export const getMenuPermsApi = () => {
  return http.get<Menu.MenuAll[]>("/admin/user/getMenuPerms", {}, { loading: false });
};

// 菜单排序
export const sortMenuList = (params: Menu.MenuAll[]) => {
  return http.post<Menu.MenuAll[]>("/admin/menu/sort", params, { loading: false });
};
