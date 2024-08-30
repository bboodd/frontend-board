<template>
  <div class="post-write">
    <fieldset>
      <table class="w3-table-all">
        <colgroup>
          <col style="width: 15%" />
          <col style="width: 35%" />
          <col style="width: 15%" />
          <col style="width: 35%" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">카테고리</th>
            <td colspan="3">
              <select v-model="requestPost.categoryId">
                <option
                  v-for="category in categoryList"
                  :key="category.categoryId"
                  :value="category.categoryId"
                >
                  {{ category.categoryName }}
                </option>
              </select>
            </td>
          </tr>

          <tr v-if="postId">
            <th>등록일시</th>
            <td colspan="3">
              {{ formatDate(post.createDate) }}
            </td>
          </tr>
          <tr v-if="postId">
            <th>수정일시</th>
            <td v-if="post.createDate != post.updateDate">
              {{ formatDate(post.updateDate) }}
            </td>
            <td v-else>-</td>
          </tr>
          <tr v-if="postId">
            <th>조회수</th>
            <td colspan="3">
              {{ post.viewCount }}
            </td>
          </tr>

          <tr>
            <th>작성자</th>
            <td colspan="3">
              <input
                v-model="requestPost.writer"
                type="text"
                maxlength="10"
                placeholder="이름을 입력해 주세요."
              />
            </td>
          </tr>

          <tr>
            <th scope="row">비밀번호</th>
            <td colspan="3">
              <input
                v-model="requestPost.password"
                type="password"
                maxlength="16"
                placeholder="비밀번호를 입력해 주세요."
              />&nbsp;
              <input
                v-model="requestPost.checkPassword"
                type="password"
                maxlength="16"
                placeholder="비밀번호 확인"
              />
            </td>
          </tr>

          <tr>
            <th>제목</th>
            <td colspan="3">
              <input
                v-model="requestPost.title"
                type="text"
                maxlength="50"
                placeholder="제목을 입력해 주세요."
              />
            </td>
          </tr>

          <tr>
            <th>내용</th>
            <td colspan="3">
              <textarea
                v-model="requestPost.content"
                cols="50"
                rows="10"
                placeholder="내용을 입력해 주세요."
              ></textarea>
            </td>
          </tr>

          <tr>
            <th>첨부파일</th>
            <td colspan="3">
              <div class="file_list">
                <div v-for="(file, idx) in requestPost.files" :key="idx">
                  <div class="file_input">
                    <input
                      class="upload-name"
                      placeholder="첨부파일"
                      v-model="file.name"
                      readonly
                    />
                    <button
                      @click="nextClickFunc"
                      class="select-down-btn w3-button w3-round w3-gray"
                    >
                      파일선택
                    </button>
                    <input
                      style="display: none"
                      type="file"
                      @change="selectFile($event, idx)"
                    />
                  </div>
                  <button
                    type="button"
                    class="del-btn w3-button w3-round w3-red"
                    @click="removeFile($event, idx, file.fileId)"
                  >
                    <span>삭제</span></button
                  >&nbsp;
                  <button
                    v-if="idx === 0"
                    type="button"
                    class="add-btn w3-button w3-round w3-blue-gray"
                    @click="addFile"
                  >
                    <span>파일추가</span>
                  </button>
                </div>

                <div v-if="fileList?.length">
                  <div v-for="(file, idx) in fileList" :key="idx">
                    <div class="file_input">
                      <input
                        class="upload-name"
                        v-model="file.fileOriginalName"
                        readonly
                      />
                      <button
                        @click="
                          downloadFile(
                            post.postId,
                            file.fileId,
                            file.fileOriginalName,
                          )
                        "
                        class="select-down-btn w3-button w3-round w3-pale-red"
                      >
                        다운로드
                      </button>
                    </div>

                    <button
                      type="button"
                      class="del-btn w3-button w3-round w3-red"
                      @click="removeFile($event, idx, file.fileId)"
                    >
                      <span>삭제</span></button
                    >&nbsp;
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>

    <p class="btn_set">
      <button
        type="button"
        class="w3-button w3-round w3-blue-gray"
        style="float: right"
        @click="saveBtn"
      >
        저장
      </button>
      <button
        type="button"
        class="w3-button w3-round w3-gray"
        style="float: left"
        @click="cancelBtn"
      >
        취소
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPost, updatePost, savePost } from "@/api/postService";
import { getCategoryList } from "@/api/categoryService";
import { formatDate } from "@/utils/filters";
import { getFileList } from "@/api/fileService";
import { downloadFile } from "@/api/fileService";
import { validateEmpty } from "@/utils/validation";

const route = useRoute();

const router = useRouter();

const post = ref({});

const categoryList = ref([]);

const fileList = ref([]);

const { postId } = route.params;

const requestPost = ref({
  categoryId: "1",
  writer: "",
  password: "",
  checkPassword: "",
  title: "",
  content: "",
  files: [{}],
  removeFileIds: [],
});

onMounted(() => {
  // 카테고리 조회
  getCategoryList().then((res) => {
    categoryList.value = res;
  });

  if (postId) {
    // 게시글정보 및 파일 정보 조회
    getPost(postId).then((res) => {
      post.value = res;
      setRequestPostData();
    });
    getFileList(postId).then((res) => {
      fileList.value = res;
    });
  }
});

/**
 * 수정 페이지일 경우 데이터 변경 시키는 함수
 */
const setRequestPostData = () => {
  requestPost.value.categoryId = post.value.categoryId;
  requestPost.value.writer = post.value.writer;
  requestPost.value.title = post.value.title;
  requestPost.value.content = post.value.content;
};

/**
 * 파일 input 안보이게 하고 버튼 클릭시 파일 선택하게하는 함수
 * @param e - event
 */
const nextClickFunc = (e) => {
  e.target.nextElementSibling.click();
};

/**
 * 저장 함수
 * 유효성 검증 후 postId유무에 따라 save or update
 */
const saveBtn = () => {
  validation();
  if (postId) {
    updatePost(postId, requestPost.value).then(() => {
      router.push({
        name: "postDetail",
        params: { postId: postId },
        query: route.query,
      });
    });
  } else {
    savePost(requestPost.value).then(() => {
      router.push({ name: "postList", query: route.query });
    });
  }
};

/**
 * 취소버튼 함수
 * postId가 있다면 detail 페이지로
 * 없다면 list 페이지로
 */
const cancelBtn = () => {
  if (postId) {
    router.push({
      name: "postDetail",
      params: { postId: postId },
      query: route.query,
    });
  } else {
    router.push({ name: "postList", query: route.query });
  }
};

/**
 * removeFileIds 에 fileId 추가
 * 이미 포함되어 있다면 false
 * @param fileId - id
 */
const removeFileId = (fileId) => {
  if (requestPost.value.removeFileIds.includes(fileId)) {
    return false;
  }
  requestPost.value.removeFileIds.push(fileId);
};

/**
 * file onChange 함수
 * @param e - event
 * @param idx - index
 * @param fileId - id
 */
const selectFile = (e, idx, fileId) => {
  const file = e.target.files[0];

  // 1. 파일 선택 창에서 취소 버튼이 클릭된 경우
  if (!file) {
    return false;
  }

  // 2. 파일 크기가 10MB를 초과하는 경우
  const fileSize = Math.floor(file.size / 1024 / 1024);
  if (fileSize > 10) {
    alert("10MB 이하의 파일을 업로드 해 주세요.");
    e.target.value = "";
    return false;
  }

  // 3. 파일 리스트에 추가
  requestPost.value.files[idx] = file;

  // 4. 삭제할 파일 id 추가
  if (fileId) {
    removeFile(fileId);
  }
};

/**
 * fileList에 빈 객체 추가
 */
const addFile = () => {
  requestPost.value.files.push({});
};

/**
 * 파일id가 있다면 id list에 추가
 * fileList 에서 값 삭제
 * @param e - event
 * @param idx - index
 * @param fileId - id
 */
const removeFile = (e, idx, fileId) => {
  if (fileId) {
    removeFileId(fileId);
    fileList.value.splice(idx, 1);
    return false;
  }

  if (idx === 0 && requestPost.value.files.length === 1) {
    requestPost.value.files = [{}];
    return false;
  }

  requestPost.value.files.splice(idx, 1);
};

/**
 * 게시글 등록/수정 전 유효성 검증
 */
const validation = () => {
  const fields = [
    requestPost.value.writer,
    requestPost.value.password,
    requestPost.value.checkPassword,
    requestPost.value.title,
    requestPost.value.content,
  ];
  const fieldNames = ["이름", "비밀번호", "비밀번호확인", "제목", "내용"];

  for (let i = 0, len = fields.length; i < len; i++) {
    validateEmpty(fields[i], fieldNames[i]);
  }
};
</script>

<style scoped>
.file_list .upload-name {
  display: inline-block;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 75%;
  color: #999999;
}
.file_list input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
.file_list .select-down-btn {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 40px;
  margin-left: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.file_input {
  display: inline-block;
  width: 75%;
}
</style>
