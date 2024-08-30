<template>
  <div class="post-detail">
    <table class="w3-table-all">
      <colgroup>
        <col style="width: 15%" />
        <col style="width: 45%" />
        <col style="width: 15%" />
        <col style="width: 10%" />
        <col style="width: 15%" />
      </colgroup>
      <tbody>
        <tr>
          <td scope="row">
            {{ post.writer }}
          </td>

          <th scope="row" style="text-align: right">등록일시</th>
          <td>{{ formatDate(post.createDate) }}</td>

          <th scope="row" style="text-align: right">수정일시</th>
          <td v-if="post.createDate != post.updateDate">
            {{ formatDate(post.updateDate) }}
          </td>
          <td v-else>-</td>
        </tr>

        <tr>
          <th scope="row">[{{ post.categoryName }}]</th>
          <td>{{ post.title }}</td>

          <td>&nbsp;</td>
          <th scope="row" style="text-align: right">조회수</th>
          <td>{{ post.viewCount }}</td>
        </tr>

        <tr>
          <td colspan="3" class="post-content" style="height: 300px">
            {{ post.content }}
          </td>
        </tr>

        <tr>
          <th scope="row">첨부파일</th>
          <td id="files" colspan="3">
            <div v-for="file in fileList" :key="file">
              <a
                href="javascript:void(0);"
                @click="
                  downloadFile(post.postId, file.fileId, file.fileOriginalName)
                "
                >{{ file.fileOriginalName }}</a
              >
            </div>
          </td>

          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>

    <div>&nbsp;</div>

    <!--/* 댓글 렌더링 영역 */-->
    <PostComment :postId="postId" />

    <!-- 비밀번호 확인 레이어 -->
    <ConfirmPassword
      v-show="flag"
      :postId="postId"
      :parent="parent"
      @cancel-confirm="cancelConfirm"
      @success-confirm="successConfirm"
    />

    <div class="common-buttons">
      <button
        type="button"
        class="w3-button w3-round w3-blue-gray"
        @click="writeConfirm"
      >
        수정</button
      >&nbsp;
      <button
        type="button"
        class="w3-button w3-round w3-red"
        @click="deleteConfirm"
      >
        삭제</button
      >&nbsp;
      <button
        type="button"
        class="w3-button w3-round w3-gray"
        @click="goListPage"
      >
        목록
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { formatDate } from "@/utils/filters";
import { getPost, deletePost } from "@/api/postService";
import { getFileList, downloadFile } from "@/api/fileService";
import PostComment from "./PostComment.vue";
import ConfirmPassword from "./ConfirmPassword.vue";

const route = useRoute();
const router = useRouter();

const { postId } = route.params;

const post = ref({});

const fileList = ref([]);

const flag = ref(false);

const parent = ref("");

onMounted(() => {
  // 게시글 정보 조회
  getPost(postId).then((res) => {
    post.value = res;
  });
  // 파일 리스트 정보 조회
  getFileList(postId).then((res) => {
    fileList.value = res;
  });
});

/**
 * 비밀번호 확인 모달 닫기
 */
const cancelConfirm = () => {
  flag.value = false;
};

/**
 * 비밀번호 확인이 성공했을때
 * parent 변수에 따라 분기
 * @param parent - delete or write
 */
const successConfirm = (parent) => {
  console.log(parent);
  flag.value = false;
  if (parent === "write") {
    goWritePage();
  }
  if (parent === "delete") {
    deletePost(postId).then(() => {
      alert("게시글 삭제 완료");
    });
  }
};

/**
 * 비밀번호 확인 레이어 open
 * parent value = write
 */
const writeConfirm = () => {
  flag.value = true;
  parent.value = "write";
};

/**
 * 비밀번호 확인 레이어 open
 * parent value = delete
 */
const deleteConfirm = () => {
  flag.value = true;
  parent.value = "delete";
};

/**
 * 게시글 수정 페이지 이동 함수
 */
const goWritePage = () => {
  router.push({ name: "postUpdate", params: postId, query: route.query });
};

/**
 * 리스트 페이지 이동 함수
 */
const goListPage = () => {
  router.push({ name: "postList", query: route.query });
};
</script>
