<template>
    <div class="search">
        <fieldset>
            <div class="sch_group fl">
                <label>등록일 &nbsp;
                    <input type="date" id="startDate" v-model="searchInfo.startDate">&nbsp;
                    ~&nbsp;
                    <input type="date" id="endDate" v-model="searchInfo.endDate">&nbsp;
                </label>&nbsp;
                <select id="categoryId" v-model="searchInfo.categoryId">&nbsp;
                    <option value="0">전체 카테고리</option>&nbsp;

                    <option v-for=" category in categoryList" :value="category.categoryId" :key="category.categoryId">{{ category.categoryName }}</option>
                </select>&nbsp;
                <input type="text" id="keyword" placeholder="검색어를 입력해 주세요." v-model="searchInfo.keyword"/>&nbsp;
                <button type="button" @click="searchPostList"><i class="fa fa-search">검색</i></button>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { usePostStore } from '@/stores/post';
import { useCategoryStore } from '@/stores/category';

const postStore = usePostStore();
const categoryStore = useCategoryStore();

const { categoryList } = storeToRefs(categoryStore); 
const { searchInfo } = storeToRefs(postStore);

onMounted(() => {
    categoryStore.getCategoryList();
})

const searchPostList = () => {
    postStore.getPostList();
}
</script>

<style scoped>
.search {
    margin: auto;
    display: flex;
}
</style>