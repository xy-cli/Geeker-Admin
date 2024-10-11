import { Login } from "@/api/interface/index";
import http from "@/api";
import { UnwrapNestedRefs } from "vue";

// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>("/admin/login", params, { loading: false });
};

// 用户退出登录
export const logoutApi = () => http.post("/admin/logout");

// 企业微信配置
export const getQwConfigApi = (params: { source: string }) => {
  return http.post<Login.ResQwConfig>("/admin/qw/config", params, { loading: false });
};

// 企业微信登录
export const qwLoginApi = (params: { code: string; source: string; state: string }) => {
  return http.post<Login.ResLogin>("/admin/qw/login", params, { loading: false });
};

export const bindQwApi = (params: UnwrapNestedRefs<Login.ReqLoginForm> & {}) => {
  return http.post<Login.ResLogin>("/admin/qw/bind", params, { loading: false });
};
