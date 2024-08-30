import { categoriesAxios } from ".";

// 카테고리 리스트 정보 조회
const getCategoryList = async () => {
  const res = await categoriesAxios.get("");
  return res.data.data;
};

export { getCategoryList };
