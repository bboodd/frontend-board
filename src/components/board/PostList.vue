<template>
  <div class="post-list">
    <div>
      <SearchInput :searchInfo="searchAndPageInfo" @search-post="searchPost" />
    </div>
    <br />

    <div class="w3-large" style="text-align: left">
      총 {{ pagination?.totalRecordCount ?? "0" }}건
    </div>
    <br />

    <table class="w3-table-all">
      <colgroup>
        <col style="width: 5%" />
        <col style="width: 5%" />
        <col style="width: 30%" />
        <col style="width: 10%" />
        <col style="width: 5%" />
        <col style="width: 10%" />
        <col style="width: 10%" />
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
      <tbody v-if="postList?.length">
        <tr v-for="row in postList" :key="row.postId">
          <td>{{ row.categoryName }}</td>
          <td v-if="row.fileCount > 0">
            <i class="glyphicon glyphicon-file" />
          </td>
          <td v-else>&nbsp;</td>
          <td style="text-align: left">
            <a href="javascript:void(0);" @click="goDetailPage(row.postId)">
              {{ row.title }}
            </a>
          </td>
          <td>{{ row.writer }}</td>
          <td>{{ row.viewCount }}</td>
          <td>{{ formatDate(row.createDate) }}</td>
          <td v-if="row.createDate != row.updateDate">
            {{ formatDate(row.updateDate) }}
          </td>
          <td v-else>-</td>
        </tr>
      </tbody>
      <tbody v-else>
        <td colspan="6">
          <div className="no_data_msg">검색된 결과가 없습니다.</div>
        </td>
      </tbody>
    </table>

    <!-- 페이지네이션 렌더링 영역 -->
    <PostPaging
      :pageInfo="searchAndPageInfo"
      :pagination="pagination"
      @move-page="movePage"
    />

    <!-- 버튼 -->
    <div class="common-buttons">
      <button
        type="button"
        class="w3-button w3-round w3-blue-gray"
        @click="goWritePage"
      >
        등록
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import SearchInput from "./SearchInput.vue";
import PostPaging from "./PostPaging.vue";
import { getPostList } from "@/api/postService";
import { formatDate } from "@/utils/filters";

const router = useRouter();

const route = useRoute();

const searchAndPageInfo = ref({
  startDate: route.query?.startDate,
  endDate: route.query?.endDate,
  categoryId: route.query?.categoryId ?? "0",
  keyword: route.query?.keyword,

  page: route.query?.page ?? "1",
  recordSize: route.query?.recordSize ?? "10", // 페이지 당 출력할 개수
  pageSize: route.query?.pageSize ?? "10", // 하단 출력 페이지 개수
});

const pagination = ref({});

const postList = ref([]);

onMounted(() => {
  const pagingResponse = getPostList(searchAndPageInfo);
  changeData(pagingResponse);
});

const goWritePage = () => {
  router.push({ name: "postWrite", query: searchAndPageInfo.value });
};

const goDetailPage = (postId) => {
  router.push({
    name: "postDetail",
    params: { postId: postId },
    query: searchAndPageInfo.value,
  });
};

const searchPost = (searchInfo) => {
  changeSearchInfo(searchInfo);
  const pagingResponse = getPostList(searchAndPageInfo);
  changeData(pagingResponse);
};

const movePage = (page) => {
  searchAndPageInfo.value.page = page;
  const pagingResponse = getPostList(searchAndPageInfo);
  changeData(pagingResponse);
};

const changeData = (pagingResponse) => {
  pagingResponse.then((res) => {
    pagination.value = res.pagination;
    postList.value = res.list;
  });
};

const changeSearchInfo = (searchInfo) => {
  searchAndPageInfo.value.startDate = searchInfo.startDate;
  searchAndPageInfo.value.endDate = searchInfo.endDate;
  searchAndPageInfo.value.categoryId = searchInfo.categoryId;
  searchAndPageInfo.value.keyword = searchInfo.keyword;
};
</script>

<style scoped>
th,
td {
  text-align: center;
}
</style>
