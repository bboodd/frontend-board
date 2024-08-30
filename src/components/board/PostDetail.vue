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
      :postId="postId"
      :flag="flag"
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
import { getPost } from "@/api/postService";
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
  const postResponse = getPost(postId);
  postResponse.then((res) => {
    post.value = res;
  });

  const fileResponse = getFileList(postId);
  fileResponse.then((res) => {
    fileList.value = res;
  });
});

const cancelConfirm = () => {
  flag.value = false;
};

const successConfirm = (parent) => {
  console.log(parent);
  flag.value = false;
  if (parent === "write") {
    goWritePage();
  }
  if (parent === "delete") {
    deletePost();
  }
};

const writeConfirm = () => {
  flag.value = true;
  parent.value = "write";
};

const deleteConfirm = () => {
  flag.value = true;
  parent.value = "delete";
};

const deletePost = () => {
  flag.value = true;
};

const goWritePage = () => {
  router.push({ name: "postUpdate", params: postId, query: route.query });
};

const goListPage = () => {
  router.push({ name: "postList", query: route.query });
};
</script>
