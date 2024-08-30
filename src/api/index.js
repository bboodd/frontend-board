import axios from "axios";
import { setInterceptors } from "./common/interceptor";

const createAxiosService = (url) => {
  const axiosService = axios.create({
    baseURL: `${process.env.VUE_APP_BOARD_API_URL}/${url}`,
  });

  return setInterceptors(axiosService);
};

export const postsAxios = createAxiosService("posts");
export const categoriesAxios = createAxiosService("categories");
