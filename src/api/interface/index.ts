// 请求响应参数（不包含data）
export interface Result {
  code: string;
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    account: string;
    password: string;
    qwUserId?: string;
  }

  export interface ResQwConfig {
    qwAgentId: string;
    qwAppId: string;
    state: string;
  }

  export interface ResLogin {
    token: string;
    avatar: string;
    userName: string;
    bindQw?: boolean | undefined;
    qwUserId?: string;
  }

  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

export namespace Post {
  export interface PostEntity {
    createTime: string;
    id: number;
    postCode: string;
    postName: string;
    postSort: number;
    status: string;
  }
}
