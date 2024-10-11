import http from "@/api";
import axios from "axios";
import { ElNotification } from "element-plus";

export interface tencentCouldRes {
  url: string;
}
export async function getUploadUrl(params) {
  return http.get<tencentCouldRes>("/admin/tencent-cloud/getUploadUrl", params);
}

export const uploadImg = async (options: any) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const fileType = options.file.type.split("/")[1];
      const tencentRes = await getUploadUrl({
        key: `${options.file.uid}.${fileType}`
      });
      const fileUrl = tencentRes.data.url.split("?")[0];
      const res = await axios.put(tencentRes.data.url, options.file);
      if (res.status == 200) {
        resolve({
          data: {
            fileUrl: fileUrl
          }
        });
      } else {
        ElNotification({
          title: "温馨提示",
          message: "图片上传失败，请您重新上传！",
          type: "error"
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
