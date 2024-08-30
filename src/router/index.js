import { createRouter, createWebHistory } from "vue-router";
import PageHome from "@/views/PageHome.vue";
import BoardView from "@/views/BoardView.vue";
import PostList from "@/components/board/PostList.vue";
import PostDetail from "@/components/board/PostDetail.vue";
import PostWrite from "@/components/board/PostWrite.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "PageHome",
      component: PageHome,
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/PageAbout.vue"),
    },
    {
      path: "/board",
      name: "board",
      component: BoardView,
      children: [
        {
          path: "",
          name: "postList",
          component: PostList,
        },
        {
          path: "write",
          name: "postWrite",
          component: PostWrite,
          children: [
            {
              path: "",
              name: "postSave",
              component: PostWrite,
            },
            {
              path: ":postId",
              name: "postUpdate",
              component: PostWrite,
            },
          ],
        },
        {
          path: "detail/:postId",
          name: "postDetail",
          component: PostDetail,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFoundPage",
      component: NotFoundPage,
    },
  ],
});

export default router;
