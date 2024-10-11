import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { Login } from "@/api/interface";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { HOME_URL } from "@/config";
import { ElNotification } from "element-plus";
import { getTimeState } from "@/utils";
import router from "@/routers";

const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();
export const useLogin = async (data: Login.ResLogin) => {
  // 1.保存登录信息
  userStore.setToken(data.token);
  userStore.setUserInfo({
    userName: data.userName,
    avatar: data.avatar,
    bindQw: data.bindQw
  });
  // 2.添加动态路由
  await initDynamicRouter();
  // 3.清空 tabs、keepAlive 数据
  await tabsStore.setTabs([]);
  await keepAliveStore.setKeepAliveName([]);
  // 4.跳转到redirect或首页
  const { redirect } = router.currentRoute.value.query;
  const defaultUrl = redirect ?? HOME_URL;
  await router.push(defaultUrl as string);
  // 5.登录提示
  ElNotification({
    title: getTimeState(),
    message: "欢迎登录",
    type: "success",
    duration: 3000
  });
};
