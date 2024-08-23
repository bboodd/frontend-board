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
                        <select id="categoryId" v-model="requestPost.categoryId">
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
                    <td colspan="3"><input type="text" id="writer" maxlength="10" placeholder="이름을 입력해 주세요." v-model="requestPost.writer"/></td>
                </tr>

                <tr>
                    <th scope="row">비밀번호</th>
                    <td colspan="3">
                        <input type="password" id="password" maxlength="16" placeholder="비밀번호를 입력해 주세요." v-model="requestPost.password"/>&nbsp;
                        <input type="password" id="checkPassword" maxlength="16" placeholder="비밀번호 확인" v-model="requestPost.checkPassword"/>
                    </td>
                </tr>

                <tr>
                    <th>제목</th>
                    <td colspan="3"><input type="text" id="title" maxlength="50" placeholder="제목을 입력해 주세요." v-model="requestPost.title"/></td>
                </tr>

                <tr>
                    <th>내용</th>
                    <td colspan="3"><textarea id="content" cols="50" rows="10" placeholder="내용을 입력해 주세요." v-model="requestPost.content"></textarea></td>
                </tr>

                <tr>
                    <th>첨부파일</th>
                    <td colspan="3">
                        <div class="file_list">
                            <div>
                                <div class="file_input">
                                    <input type="text" readonly />
                                    <label> 첨부파일
                                        <input type="file" name="files" @change="selectFile(this);" />
                                    </label>
                                </div>
                                <button type="button" @click="removeFile(this);" class="w3-button w3-round w3-blue-gray"><span>삭제</span></button>&nbsp;
                                <button type="button" @click="addFile;" class="w3-button w3-round w3-blue-gray"><span>파일 추가</span></button>
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
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';

const route = useRoute();
const router = useRouter();

const postStore = usePostStore();
const categoryStore = useCategoryStore();

const { categoryList } = storeToRefs(categoryStore);
const { post } = storeToRefs(postStore);

const postId = route.params.postId;

const requestPost = reactive({
    categoryId: '1',
    writer: '',
    password: '',
    checkPassword: '',
    title: '',
    content: '',
    files: [],
    removeFileIds: []
});

onMounted(() => {
    categoryStore.getCategoryList();
    if (postId) {
        postStore.getPost(postId);
        setPostData();
    }
});

const saveBtn = () => {
    setAddFiles();
    if (postId) {
        postStore.updatePost(postId, requestPost);
    } else {
        postStore.savePost(requestPost);
    }
};

const setPostData = () => {
    requestPost.categoryId = post.categoryId;
    requestPost.writer = post.writer;
    requestPost.title = post.title;
    requestPost.content = post.content;
}

const setAddFiles = () => {
    const fileInputs = document.querySelectorAll('.file_list input[type="file"]');
    fileInputs.forEach(input => {
        if(input.files[0]){
            requestPost.files.push(input.files[0]);
        }
    });
}

const cancelBtn = () => {
    if (postId) {
        router.push(({name: 'postDetail'}), postId);
    } else {
        router.push(({name: 'postList'}));
    }
};

const dateFormat = (date) => {
    return moment(date).format("YYYY.MM.DD hh:MM");
};

const removeFileId = () => {
    return {
        add(fileId) {
            if (requestPost.removeFileIds.includes(fileId)){
                return false;
            }
            requestPost.removeFileIds.push(fileId);
        }
    }
}

// TODO: e.target.value 적용해야함
// 파일 선택
const selectFile = (element, fileId) => {

    const file = element.files[0];
    const fileName = element.closest('.file_input').firstElementChild;

    // 1. 파일 선택 창에서 취소 버튼이 클릭된 경우
    if ( !file ) {
        fileName.value = '';
        return false;
    }

    // 2. 파일 크기가 10MB를 초과하는 경우
    const fileSize = Math.floor(file.size / 1024 / 1024);
    if (fileSize > 10) {
        alert('10MB 이하의 파일을 업로드 해 주세요.');
        fileName.value = '';
        element.value = '';
        return false;
    }

    // 3. 파일명 지정
    fileName.value = file.name;

    // 4. 삭제할 파일 id 추가
    if (fileId) {
        removeFile.add(fileId);
    }
};

const addFile = () => {
    const fileDiv = document.createElement('div');
    fileDiv.innerHTML =`
        <div class="file_input">
            <input type="text" readonly />
            <label> 첨부파일
                <input type="file" name="files" onchange="selectFile(this);" />
            </label>
        </div>
        <button type="button" onclick="removeFile(this);" class="w3-button w3-round w3-blue-gray"><span>삭제</span></button>
    `;
    document.querySelector('.file_list').appendChild(fileDiv);
};

const removeFile = (element, fileId) => {

    if (fileId) {
        removeFileId.add(fileId);
    }

    const fileAddBtn = element.nextElementSibling;
    if (fileAddBtn) {
        const inputs = element.previousElementSibling.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        return false;
    }

    element.parentElement.remove();


}

</script>