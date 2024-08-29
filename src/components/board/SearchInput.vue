<template>
  <div class="search">
    <fieldset>
      <div>
        <label
          >등록일 &nbsp;
          <input v-model="searchInfo.startDate" type="date" />&nbsp; ~&nbsp;
          <input v-model="searchInfo.endDate" type="date" />&nbsp; </label
        >&nbsp;
        <select v-model="searchInfo.categoryId">
          &nbsp;
          <option value="0">전체 카테고리</option>
          &nbsp;

          <option
            v-for="category in categoryList"
            :key="category.categoryId"
            :value="category.categoryId"
          >
            {{ category.categoryName }}
          </option></select
        >&nbsp;
        <input
          v-model="searchInfo.keyword"
          type="text"
          placeholder="검색어를 입력해 주세요."
        />&nbsp;
        <button type="button" @click="$emit('searchPost', searchInfo)">
          <i class="fa fa-search">검색</i>
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { onMounted, defineProps, ref } from "vue";
import { getCategoryList } from "@/api/categoryService";

const categoryList = ref([]);

const props = defineProps(["searchInfo"]);

const searchInfo = ref({
  startDate: props.searchInfo.startDate,
  endDate: props.searchInfo.endDate,
  categoryId: props.searchInfo.categoryId,
  keyword: props.searchInfo.keyword,
});

onMounted(() => {
  getCategoryList().then((res) => {
    categoryList.value = res;
  });
});
</script>

<style scoped>
.search {
  margin: auto;
  display: flex;
}
</style>
