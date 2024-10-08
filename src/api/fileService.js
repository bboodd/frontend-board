import { postsAxios } from ".";

// 파일 리스트 정보 조회
const getFileList = async (postId) => {
  const res = await postsAxios.get(`/${postId}/files`);
  return res.data.data;
};

// 다운로드 파일
const downloadFile = async (postId, fileId, fileOriginalName) => {
  const res = await postsAxios.get(`/${postId}/files/${fileId}/download`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const a = document.createElement("a");
  a.href = url;
  a.download = fileOriginalName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export { getFileList, downloadFile };
