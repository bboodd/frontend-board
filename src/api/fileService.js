import { postsAxios } from ".";

const getFileList = async (postId) => {
  const res = await postsAxios.get(`/${postId}/files`);
  return res.data.data;
};

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
