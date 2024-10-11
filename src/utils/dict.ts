// ? 系统全局字典

/**
 * @description：用户性别
 */
export const genderType = [
  { label: "男", value: 1 },
  { label: "女", value: 2 }
];

/**
 * @description：用户状态
 */
export const statusType = [
  { label: "停用", value: "1", tagType: "danger" },
  { label: "正常", value: "0", tagType: "success" }
];

export const AuthType = [
  { label: "用户", value: "1" },
  { label: "部门", value: "2" }
];

export const dataScopeType = [
  { label: "全部数据权限", value: "1" },
  { label: "自定数据权限", value: "2" },
  { label: "本部门数据权限", value: "3" },
  { label: "本部门及以下数据权限", value: "4" }
];
