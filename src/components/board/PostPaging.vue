<template>
  <div v-if="!props.pagination">&nbsp;</div>
  <div v-else class="pagination w3-bar w3-padding-16 w3-small">
    <strong v-if="props.pagination.existPrevPage">
      <a href="javascript:void(0);" @click="$emit('movePage', 1)">첫 페이지</a>
      <a
        href="javascript:void(0);"
        @click="$emit('movePage', props.pagination.startPage - 1)"
        >이전 페이지</a
      >
    </strong>
    <strong v-for="i in props.pagination.endPage" :key="i">
      <a
        v-if="i !== props.pageInfo.page"
        href="javascript:void(0);"
        @click="$emit('movePage', i)"
        >{{ i }}</a
      >
      <span v-else>{{ i }}</span
      >&nbsp;
    </strong>
    <strong v-if="props.pagination.existNextPage">
      <a
        href="javascript:void(0);"
        @click="$emit('movePage', props.pagination.endPage + 1)"
        >다음 페이지</a
      >
      <a
        href="javascript:void(0);"
        @click="$emit('movePage', props.pagination.totalPageCount)"
        >마지막 페이지</a
      >
    </strong>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";

const props = defineProps(["pageInfo", "pagination"]);

onMounted(() => {});
</script>
