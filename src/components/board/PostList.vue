<template>
    <div class="post-list">
        <div>
            <SearchInput />
        </div><br />

        <div class="w3-large" style="text-align: left;">
            총 {{ postList.length }}건
        </div><br />

        <table class="w3-table-all">
            <colgroup>
                <col style="width: 5%;"/><col style="width:5%;"/><col style="width:30%;"/><col style="width:7.5%;"/><col style="width:5%;"/><col style="width:10%;"/><col style="width:10%;"/>
            </colgroup>
            <thead>
            <tr>
                <th scope="col">카테고리</th>
                <th scope="col">&nbsp;</th>
                <th scope="col">제목</th>
                <th scope="col">작성자</th>
                <th scope="col">조회수</th>
                <th scope="col">등록일시</th>
                <th scope="col">수정일시</th>
            </tr>
            </thead>

            <!-- 리스트 데이터 렌더링 영역 -->
            <tbody v-if="postList.length">
                <tr v-for="row in postList" :key="row.postId">
                    <td>{{ row.categoryName }}</td>
                    <td v-if="row.fileCount > 0"><i class="glyphicon glyphicon-file"></i></td>
                    <td v-else>&nbsp;</td>
                    <td style="text-align: left;">
                        <RouterLink :to="`/board/detail/${row.postId}`">{{ row.title }}</RouterLink>
                    </td>
                    <td>{{ row.writer }}</td>
                    <td>{{ row.viewCount }}</td>
                    <td>{{ dateFormat(row.createDate) }}</td>
                    <td v-if="row.createDate != row.updateDate">{{ dateFormat(row.updateDate) }}</td>
                    <td v-else>-</td>
                </tr>
            </tbody>
            <tbody v-else>
                <td colspan="6"><div className="no_data_msg">검색된 결과가 없습니다.</div></td>
            </tbody>
        </table>

        <!-- 페이지네이션 렌더링 영역 -->
        <div v-if="!pagination || !searchInfo">
            &nbsp;
        </div>
        <div v-else class="pagination w3-bar w3-padding-16 w3-small">
            <strong v-if="pagination.existPrevPage">
                <a href="javascript:void(0);" @click="movePage(1)">첫 페이지</a>
                <a href="javascript:void(0);" @click="movePage(pagination.startPage - 1)">이전 페이지</a>
            </strong>
            <strong v-for="i in pagination.endPage" :key="i">
                <a v-if="i !== searchInfo.page" @click="movePage(i)" href="javascript:void(0);">{{ i }}</a>
                <span v-else>{{ i }}</span>&nbsp;
            </strong>
            <strong v-if="pagination.existNextPage">
                <a href="javascript:void(0);" @click="movePage(pagination.endPage + 1)">다음 페이지</a>
                <a href="javascript:void(0);" @click="movePage(pagination.totalPageCount)">마지막 페이지</a>
            </strong>
        </div>

        <!-- 버튼 -->
        <div class="common-buttons">
            <button type="button" class="w3-button w3-round w3-blue-gray" @click="goWritePage">등록</button>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { usePostStore } from '@/stores/post';
import { onMounted } from 'vue';
import moment from 'moment';
import SearchInput from './SearchInput.vue';

const postStore = usePostStore();
const router = useRouter();
const { postList, pagination, searchInfo } = storeToRefs(postStore);

onMounted(() => {
    postStore.getPostList();
})

const goWritePage = () => {
    router.push({ name: 'postWrite'});
};

const dateFormat = (date) => {
    return moment(date).format("YYYY.MM.DD hh:MM");
};

const movePage = (page) => {
    console.log(pagination);
    searchInfo.value.page = page;

    postStore.getPostList();
}




</script>

<style scoped>
th, td {
    text-align: center;
}
</style>