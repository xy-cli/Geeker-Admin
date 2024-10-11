import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";
import { APP_ID } from "@/config";

export const useUserStore = defineStore({
  id: "meta-internal-user",
  state: (): UserState => ({
    token: "",
    appId: APP_ID,
    userInfo: { userName: "", avatar: "", bindQw: undefined }
  }),
  getters: {},
  actions: {
    setAppId(appId: number) {
      this.appId = appId;
    },
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("meta-internal-user")
});
