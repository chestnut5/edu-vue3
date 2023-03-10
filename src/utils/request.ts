import axios, { type AxiosRequestHeaders } from "axios";
import { useTokenStore } from "@/stores/myToken";
import { refreshToken } from "@/api/users";
import router from "@/router/index";
const request = axios.create({
  baseURL: "http://39.97.218.60/",
  timeout: 5000,
});
// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。

// 2 请求拦截器 config代表每次请求的配置对象
request.interceptors.request.use((config) => {
  // 以前可能没有headers 可能不要也行
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }
  const store = useTokenStore(); // 获取token
  //3 把access_Token添加到每一次请求当中  可选
  config.headers.Authorization = store.token?.access_token;
  // 返回出去
  return config;
});

// 响应拦截器 成功返回成功的回调 失败返回失败的回调
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      //刷新token
      const { data } = await refreshToken();
      console.log(data);

      if (data.success) {
        // 保存新token
        useTokenStore().saveToken(data.content);
        // 重新请求之前的接口 并且把结果返回
        return request(error.config);
      } else {
        // 否则 跳转到登录 login、
        ElMessage.error("刷新token失败 需要重新登陆才可以");
        router.push({ name: "login" });
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default request;
