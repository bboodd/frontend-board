import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

const REST_BOARD_API = "http://localhost:8081/api-board/posts";

export const usePostStore = defineStore('post', () => {
    const postList = ref([]);
    const post = ref({});

    const getPostList = () => {
        axios.get(REST_BOARD_API)
            .then((res) => {
                postList.value = res.result.data.list;
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const getPost = (postId) => {
        axios.get(`${REST_BOARD_API}/${postId}`)
            .then((res) => {
                post.value = res.result.data;
            }) 
            .catch((err) => {
                console.log(err);
            })
    };

    const savePost = (post) => {
        axios.post(REST_BOARD_API, post)
        .then(() => {
            router.push({name: 'postList'})
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const updatePost = (postId, post) => {
        axios.patch(`${REST_BOARD_API}/${postId}`, post)
        .then(() => {
            router.push({name: 'postList'})
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const deletePost = (postId) => {
        axios.delete(`${REST_BOARD_API}/${postId}`)
        .then(() => {
            router.push({name: 'postList'})
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return { postList, post, getPostList, getPost, savePost, updatePost, deletePost}
})