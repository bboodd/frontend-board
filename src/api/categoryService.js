import { categoriesAxios } from ".";

const getCategoryList = async () => {
  const res = await categoriesAxios.get("");
  return res.data.data;
};

export { getCategoryList };
