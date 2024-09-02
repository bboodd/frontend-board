import { postsAxios } from ".";

// 게시글 리스트 정보 조회
const getPostList = async (searchAndPageInfo) => {
  const res = await postsAxios.get("", {
    params: searchAndPageInfo.value,
  });
  return res.data.data;
};

// 게시글 정보 조회
const getPost = async (postId) => {
  const res = await postsAxios.get(postId);
  return res.data.data;
};

// 게시글 등록
const savePost = async (post) => {
  return await postsAxios.post("", post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 게시글 삭제
const deletePost = async (postId) => {
  return await postsAxios.delete(postId);
};

// 게시글 수정
const updatePost = async (postId, post) => {
  return await postsAxios.put(postId, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 게시글 비밀번호 체크
const checkPassword = async (postId, password) => {
  return await postsAxios.post(`/${postId}/password`, password);
};

export {
  getPostList,
  getPost,
  savePost,
  updatePost,
  deletePost,
  checkPassword,
};
