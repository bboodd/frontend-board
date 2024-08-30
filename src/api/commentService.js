import { postsAxios } from ".";

const getCommentList = async (postId) => {
  const res = await postsAxios.get(`/${postId}/comments`);
  return res.data.data;
};

const getComment = async (postId, commentId) => {
  const res = await postsAxios.get(`/${postId}/comments/${commentId}`);
  return res.data.data;
};

const saveComment = async (postId, comment) => {
  return await postsAxios.post(`/${postId}/comments`, comment);
};

const updateComment = async (postId, commentId, comment) => {
  return await postsAxios.put(`/${postId}/comments/${commentId}`, comment);
};

const deleteComment = async (postId, commentId) => {
  return await postsAxios.deleteComment(`/${postId}/comments/${commentId}`);
};

export {
  getCommentList,
  getComment,
  saveComment,
  updateComment,
  deleteComment,
};
