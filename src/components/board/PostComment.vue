<template>
  <div v-if="commentList.length" class="comment-list">
    <div v-for="(comment, idx) in commentList" :key="idx" class="comment">
      <span class="img"></span>
      <p class="date">
        <span>{{ formatDate(comment.createDate) }}</span>
      </p>
      <div class="content">
        <div class="text-content">{{ comment.content }}</div>
      </div>
      <p class="btns">
        <button type="button" class="w3-button w3-round w3-blue-gray">
          수정
        </button>
        <button type="button" class="w3-button w3-round w3-red">삭제</button>
      </p>
    </div>
  </div>

  <div v-else>
    <div class="cm_none"><p>등록된 댓글이 없습니다.</p></div>
  </div>

  <div class="comment-write">
    <fieldset>
      <div class="comment-input">
        <textarea
          cols="90"
          rows="4"
          placeholder="댓글을 입력해 주세요."
          v-model="requestComment.content"
          @keyup="countingLength"
        ></textarea>

        <span
          ><button
            @click="saveBtn"
            type="button"
            class="w3-button w3-round w3-blue-gray"
          >
            등 록
          </button>
          <i>{{ count }}/300자</i>
        </span>
      </div>
    </fieldset>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import { formatDate } from "@/utils/filters";
import { getCommentList, saveComment } from "@/api/commentService";
import { validateEmpty } from "@/utils/validation";

const props = defineProps(["postId"]);

const commentList = ref([]);

const count = ref(0);

const requestComment = ref({
  content: "",
});

onMounted(() => {
  getCommentList(props.postId).then((res) => {
    commentList.value = res;
  });
});

/**
 * 댓글 저장 함수
 * 저장 성공시 댓글 리스트 조회
 */
const saveBtn = () => {
  validation();
  saveComment(props.postId, requestComment.value).then(() => {
    alert("등록되었습니다.");
    requestComment.value.content = "";
    count.value = 0;
    getCommentList(props.postId).then((res) => {
      commentList.value = res;
    });
  });
};

/**
 * 댓글 입력 내용 유효성 검증
 */
const validation = () => {
  const fields = [commentList.value.content];
  const fieldNames = ["댓글내용"];

  for (let i = 0, len = fields.length; i < len; i++) {
    validateEmpty(fields[i], fieldNames[i]);
  }
};

/**
 * 댓글 입력 길이 onKeyup 함수
 * @param e - event
 */
const countingLength = (e) => {
  if (e.target.value > 300) {
    alert("댓글을 300자 이하로 입력해 주세요.");
    e.target.value = e.target.value.substring(0, 300);
    e.target.focus();
  }
  count.value = e.target.value.length;
};
</script>
<style scoped>
.comment-list {
  border-bottom: 1px solid #ddd;
  font-size: 16px;
}
.comment-list .comment {
  overflow: hidden;
  border-top: 1px solid #e0e0e0;
  padding: 15px 0;
  position: relative;
}
.comment-list div .date span {
  display: inline-block;
  font-size: 15px;
  font-weight: 300;
  color: #a4a5a3;
  position: relative;
  /* padding-left: 10px; */
  /* margin-left: 1%; */
}
.comment-list div .btns {
  position: absolute;
  top: 15px;
  right: 0;
}
.comment-list div .btns button {
  height: 22px;
  line-height: 20px;
  padding: 0 5px;
  font-size: 14px;
  background: #fff;
  color: #999;
  border: 1px solid #c1c1c1;
  margin-left: 5px;
}
.comment-list div .content {
  margin-top: 10px;
}
.comment-list div .content .text-content {
  line-height: 1.6;
  margin: 7px 0;
  color: #888;
  word-break: break-all;
  /* margin-left: 20px; */
}
.comment-write {
  margin: 4% 0 15px 0;
}
.comment-write input[type="text"],
.comment-list {
  padding: 10px;
}
.comment-write .comment-input {
  position: relative;
  background: #fff;
  border: 1px solid #ccc;
}
.comment-write .comment-input > span {
  display: block;
  text-align: right;
  position: relative;
}
.comment-write .comment-input > span > i {
  position: absolute;
  top: 11px;
  left: 10px;
  font-size: 13px;
  color: #999;
}
.comment-input textarea {
  width: 100%;
  height: 90px;
  background: #f9f9f9;
  border: 0;
  border-bottom: 1px solid #ccc;
}
.comment-input button {
  width: 76px;
  height: 50px;
  line-height: 5px;
  background: #139dc8;
  border-radius: 0;
  color: #fff;
  padding: 0;
  margin: 0;
  font-size: 15px;
  position: relative;
  right: -1px;
}
</style>
