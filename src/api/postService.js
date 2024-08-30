import { postsAxios } from ".";

const getPostList = async (searchAndPageInfo) => {
  const res = await postsAxios.get("", {
    params: searchAndPageInfo.value,
  });
  return res.data.data;
};

const getPost = async (postId) => {
  const res = await postsAxios.get(postId);
  return res.data.data;
};

const savePost = async (post) => {
  return await postsAxios.post("", post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deletePost = async (postId) => {
  return await postsAxios.delete(postId);
};

const updatePost = async (postId, post) => {
  return await postsAxios.put(postId, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const checkPassword = async (postId, password) => {
  return await postsAxios.post(`${postId}/password`, password);
};

export {
  getPostList,
  getPost,
  savePost,
  updatePost,
  deletePost,
  checkPassword,
};
