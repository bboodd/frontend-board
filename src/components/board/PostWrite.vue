<template>
    <div class="post-write">
        <fieldset>
            <table class="w3-table-all">
                <colgroup>
                    <col style="width:15%;" /><col style="width:35%;" /><col style="width:15%;" /><col style="width:35%;" />
                </colgroup>
                <tbody>

                <tr>
                    <th scope="row">카테고리</th>
                    <td colspan="3">
                        <select id="categoryId" v-model="post.categoryId">
                            <option v-for=" category in categoryList" :value="category.categoryId" :key="category.categoryId">{{ category.categoryName }}</option>
                        </select>
                    </td>
                </tr>

                <tr v-if="postId">
                    <th>등록일시</th>
                    <td colspan="3">{{ dateFormat(post.createDate) }}</td>
                </tr>
                <tr v-if="postId">
                    <th>수정일시</th>
                    <td v-if="post.createDate != post.updateDate">{{ dateFormat(post.updateDate) }}</td>
                    <td v-else>-</td>
                </tr>
                <tr v-if="postId">
                    <th>조회수</th>
                    <td colspan="3">{{ post.viewCount }}</td>
                </tr>

                <tr>
                    <th>작성자</th>
                    <td colspan="3"><input type="text" id="writer" maxlength="10" placeholder="이름을 입력해 주세요." v-model="post.writer"/></td>
                </tr>

                <tr>
                    <th scope="row">비밀번호</th>
                    <td colspan="3">
                        <input type="password" id="password" maxlength="16" placeholder="비밀번호를 입력해 주세요." v-model="post.password"/>&nbsp;
                        <input type="password" id="checkPassword" maxlength="16" placeholder="비밀번호 확인" v-model="post.checkPassword"/>
                    </td>
                </tr>

                <tr>
                    <th>제목</th>
                    <td colspan="3"><input type="text" id="title" maxlength="50" placeholder="제목을 입력해 주세요." v-model="post.title"/></td>
                </tr>

                <tr>
                    <th>내용</th>
                    <td colspan="3"><textarea id="content" cols="50" rows="10" placeholder="내용을 입력해 주세요." v-model="post.content"></textarea></td>
                </tr>

                <tr>
                    <th>첨부파일</th>
                    <td colspan="3">
                        <div class="file_list">
                            <div>
                                <div class="file_input">
                                    <input type="text" readonly />
                                    <label> 첨부파일
                                        <input type="file" name="files" onchange="selectFile(this);" />
                                    </label>
                                </div>
                                <button type="button" @click="removeFile(this);" class="w3-button w3-round w3-blue-gray"><span>삭제</span></button>&nbsp;
                                <button type="button" @click="addFile();" class="w3-button w3-round w3-blue-gray"><span>파일 추가</span></button>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </fieldset>

        <p class="btn_set">
            <button type="button" @click="saveBtn" class="w3-button w3-round w3-blue-gray" style="float: right;">저장</button>
            <button type="button" @click="cancelBtn" class="w3-button w3-round w3-gray" style="float: left;">취소</button>
        </p>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { reactive, onMounted } from 'vue';
import { usePostStore } from '@/stores/post';
import { useCategoryStore } from '@/stores/category';
import { useRoute } from 'vue-router';
import moment from 'moment';

const route = useRoute();

const postStore = usePostStore();
const categoryStore = useCategoryStore();

const { categoryList } = storeToRefs(categoryStore);

const postId = route.params.postId;

let post = reactive({
    categoryId: '1',
    writer: '',
    password: '',
    checkPassword: '',
    title: '',
    content: '',
    files: {},
    removeFileIds: []
});

onMounted(() => {
    categoryStore.getCategoryList();
    if(postId) {
        postStore.getPost(postId);
        post = postStore.post;
    }
});

const saveBtn = () => {
    if(postId) {
        postStore.updatePost(postId, post);
    } else {
        postStore.savePost(post);
    }
};

const cancelBtn = () => {

};

const dateFormat = (date) => {
    return moment(date).format("YYYY.MM.DD hh:MM");
};

</script>