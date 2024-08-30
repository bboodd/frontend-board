import { postsAxios } from ".";

// 댓글 리스트 정보 조회
const getCommentList = async (postId) => {
  const res = await postsAxios.get(`/${postId}/comments`);
  return res.data.data;
};

// 댓글 정보 조회
const getComment = async (postId, commentId) => {
  const res = await postsAxios.get(`/${postId}/comments/${commentId}`);
  return res.data.data;
};

// 댓글 저장
const saveComment = async (postId, comment) => {
  return await postsAxios.post(`/${postId}/comments`, comment);
};

// 댓글 수정
const updateComment = async (postId, commentId, comment) => {
  return await postsAxios.put(`/${postId}/comments/${commentId}`, comment);
};

// 댓글 삭제
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
