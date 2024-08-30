import axios from "axios";
import { setInterceptors } from "./common/interceptor";

// base url을 가지는 axios 생성
const createAxiosService = (url) => {
  const axiosService = axios.create({
    baseURL: `${process.env.VUE_APP_BOARD_API_URL}/${url}`,
  });

  return setInterceptors(axiosService);
};

export const postsAxios = createAxiosService("posts");
export const categoriesAxios = createAxiosService("categories");
