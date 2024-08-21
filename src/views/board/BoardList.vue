<template>
    <div class="board-list">
      <table class="w3-table-all">
        <thead>
        <tr>
            <th>카테고리</th>
            <th>&nbsp;</th>
            <th style="width: 40%;">제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>수정일시</th>
            <th>등록일시</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, postId) in list" :key="postId">
          <td>{{ row.categoryName }}</td>
          <td v-if="row.fileCount > 0"><i class="glyphicon glyphicon-file"></i></td>
          <td v-else>&nbsp;</td>
          <td style="text-align: left;"><a v-on:click="fnView(`${row.postId}`)">{{ row.title }}</a></td>
          <td>{{ row.writer }}</td>
          <td>{{ row.viewCount }}</td>
          <td>{{ DateFormat(row.createDate) }}</td>
          <td v-if="row.createDate != row.updateDate">{{ DateFormat(row.updateDate) }}</td>
          <td v-else>-</td>
        </tr>
        </tbody>
      </table>

      <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">등록</button>
      </div>

      <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.total_list_cnt > 0">
        <span class="pg">
        <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-border">&lt;&lt;</a>
        <a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"
         class="prev w3-button w3-border">&lt;</a>
      <template v-for=" (n,index) in paginavigation()">
          <template v-if="paging.page==n">
              <strong class="w3-button w3-border w3-green" :key="index">{{ n }}</strong>
          </template>
          <template v-else>
              <a class="w3-button w3-border" href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{ n }}</a>
          </template>
      </template>
      <a href="javascript:;" v-if="paging.total_page_cnt > paging.end_page"
         @click="fnPage(`${paging.end_page+1}`)" class="next w3-button w3-border">&gt;</a>
      <a href="javascript:;" @click="fnPage(`${paging.total_page_cnt}`)" class="last w3-button w3-border">&gt;&gt;</a>
      </span>
    </div>
  </div>
</template>

<style scoped>
th, td {
    text-align: center;
}



</style>

<script>
import moment from 'moment'

export default {
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
      no: '', //게시판 숫자처리
      paging: {
        block: 0,
        end_page: 0,
        next_block: 0,
        page: 0,
        page_size: 0,
        prev_block: 0,
        start_index: 0,
        start_page: 0,
        total_block_cnt: 0,
        total_list_cnt: 0,
        total_page_cnt: 0,
      }, //페이징 데이터
      page: this.$route.query.page ? this.$route.query.page : 1,
      size: this.$route.query.size ? this.$route.query.size : 10,
      keyword: this.$route.query.keyword,
      paginavigation: function () { //페이징 처리 for문 커스텀
        let pageNumber = [] //;
        let start_page = this.paging.start_page;
        let end_page = this.paging.end_page;
        for (let i = start_page; i <= end_page; i++) pageNumber.push(i);
        return pageNumber;
      }
    }
  },
  mounted() {
    this.fnGetList()
  },
  methods: {
    DateFormat(date){
        return moment(date).format("YYYY.MM.DD hh:MM");
    },
    fnGetList() {
      this.list = [
      {
                    "postId": 18,
                    "categoryId": 1,
                    "writer": "알람 테스트",
                    "title": "알람 테스트",
                    "content": "비밀번호는 qw12!",
                    "createDate": "2024-08-19T12:27:37",
                    "updateDate": "2024-08-19T12:27:37",
                    "status": 1,
                    "viewCount": 4,
                    "fileCount": 0,
                    "categoryName": "JAVA"
                },
                {
                    "postId": 17,
                    "categoryId": 1,
                    "writer": "게시글 작성 테스트",
                    "title": "게시글 작성 테스트",
                    "content": "게시글 작성 테스트",
                    "createDate": "2024-08-17T15:38:20",
                    "updateDate": "2024-08-17T15:38:20",
                    "status": 1,
                    "viewCount": 0,
                    "fileCount": 0,
                    "categoryName": "JAVA"
                },
                {
                    "postId": 16,
                    "categoryId": 2,
                    "writer": "qwe123",
                    "title": "qwe123",
                    "content": "비밀번호는 qwe123!",
                    "createDate": "2024-08-16T16:08:05",
                    "updateDate": "2024-08-19T16:45:38",
                    "status": 1,
                    "viewCount": 25,
                    "fileCount": 3,
                    "categoryName": "JavaScript"
                }
      ]
    }
    }
}
</script>