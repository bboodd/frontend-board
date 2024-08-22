<template>
    <div class="post-detail">

        <table class="w3-table-all">
            <colgroup>
                <col style="width:15%;" /><col style="width:50%;" /><col style="width:20%;" /><col style="width:20%;" /><col style="width:15%;" />
            </colgroup>
            <tbody>
                <tr>
                    <td scope="row">{{ post.writer }}</td>

                    <th scope="row" style="text-align: right;">등록일시</th>
                    <td>{{ dateFormat(post.createDate) }}</td>

                    <th scope="row">수정일시</th>
                    <td v-if="post.createDate != post.updateDate">{{ dateFormat(post.updateDate) }}</td>
                    <td v-else>-</td>
                </tr>

                <tr>
                    <th scope="row">[{{ post.categoryName }}]</th>
                    <td>{{ post.title }}</td>

                    <td>&nbsp;</td>
                    <th scope="row" style="text-align: right;">조회수</th>
                    <td>{{ post.viewCount }}</td>
                </tr>

                <tr>
                    <td colspan="3" class="post-content" style="height: 300px;">{{ post.content }}</td>
                </tr>

                <tr>
                    <th scope="row">첨부파일</th>
                    <td id="files" colspan="3">

                    </td>
                    <td>&nbsp;</td>
                </tr>
            </tbody>
        </table>
        
        <div>
            &nbsp;
        </div>

      <!--/* 댓글 렌더링 영역 */-->
        <div class="cm_list">

        </div>

        <!--/* 댓글 작성 */-->
        <div class="cm_write">
            <fieldset>
                <!-- <legend class="skipinfo">댓글 입력</legend> -->
                <div class="cm_input">
                    <p><textarea id="content" name="content" onkeyup="countingLength(this);" cols="90" rows="4" placeholder="댓글을 입력해 주세요."></textarea></p>
                    <span><button type="button" class="btns" onclick="saveComment();">등 록</button> <i id="counter">0/300자</i></span>
                </div>
            </fieldset>
        </div>

        <div class="common-buttons">
            <button type="button" class="w3-button w3-round w3-blue-gray" @click="goWritePage">수정</button>&nbsp;
            <button type="button" class="w3-button w3-round w3-red" @click="deletePost">삭제</button>&nbsp;
            <button type="button" class="w3-button w3-round w3-gray" @click="goListPage">목록</button>
        </div>

    </div>
</template>

<script setup>
import moment from 'moment';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '@/stores/post';
import { onMounted } from 'vue';

const postStore = usePostStore();
const route = useRoute();
const router = useRouter();

const { post } = storeToRefs(postStore);

const postId = route.params.postId;

onMounted(() => {
    postStore.getPost(postId);
})

const goWritePage = () => {
    router.push(({name: 'postUpdate'}), postId);
};

const deletePost = () => {

};

const goListPage = () => {

};

const dateFormat = (date) => {
    return moment(date).format("YYYY.MM.DD hh:MM");
};

</script>