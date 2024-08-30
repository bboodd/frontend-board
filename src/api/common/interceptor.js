export const setInterceptors = (axiosService) => {
  axiosService.interceptors.request.use(
    // 요청 보내기 전
    (config) => {
      return config;
    },
    (error) => {
      // 요청이 잘못 되엇을 때 에러가 컴포넌트 단으로 오기 전
      return Promise.reject(error);
    },
  );

  axiosService.interceptors.response.use(
    (response) => {
      // 서버에 요청을 보내고 나서 응답을 받기 전
      return response;
    },
    (error) => {
      // 응답이 에러인 경우
      return Promise.reject(error);
    },
  );

  return axiosService;
};
