<template>
  <div class="w3-modal">
    <div class="w3-modal-content">
      <div class="w3-container w3-teal">
        <h3>비밀번호 확인</h3>
      </div>

      <div class="w3-container">
        <table class="w3-table-all">
          <colgroup>
            <col style="width: 30%" />
            <col style="width: 70%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">비밀번호</th>
              <td>
                <input
                  v-model="inputPassword"
                  type="password"
                  placeholder="비밀번호 입력"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p class="btn-set" style="text-align: center; margin-right: 20px">
          <button
            @click="confirm"
            type="button"
            class="w3-button w3-round w3-blue-gray"
          >
            확인
          </button>
          <button
            @click="$emit('cancelConfirm')"
            type="button"
            class="w3-button w3-round w3-red"
          >
            취소
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import { checkPassword } from "@/api/postService";

const props = defineProps(["postId", "parent"]);
const emit = defineEmits(["successConfirm"]);

const inputPassword = ref("");

/**
 * 비밀번호 입력후 확인버튼 onClick 함수
 */
const confirm = () => {
  if (!inputPassword.value) {
    alert("비밀번호를 입력해 주세요");
    return false;
  }
  // 비밀번호 일치여부 확인
  checkPassword(props.postId, inputPassword.value).then((res) => {
    console.log(res);
    // delete or write
    emit("success-confirm", props.parent);
  });

  inputPassword.value = "";
};
</script>
<style scoped>
.w3-modal {
  display: block;
}
.w3-modal-content {
  width: 30%;
  margin-top: 200px;
}
.w3-container .w3-table-all {
  margin-top: 20px;
  padding: 20px;
}
.btn-set {
  margin: 10px 0 10px;
}
.btn-set button {
  margin-right: 20px;
}
</style>
