import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/PageHome.vue'
import BoardView from '@/views/board/BoardView.vue'
import PostList from '@/components/board/PostList.vue'
import PostDetail from '@/components/board/PostDetail.vue'
import PostWrite from '@/components/board/PostWrite.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'PageHome',
            component: PageHome
        },
        {
            path: '/about',
            name: 'About',
            component: () => import('../views/PageAbout.vue')
        },
        {
            path: '/board',
            name: 'board',
            component: BoardView,
            children: [
                {
                    path: '',
                    name: 'postList',
                    component: PostList
                },
                {
                    path: 'write',
                    name: 'postWrite',
                    component: PostWrite
                },
                {
                    path: ':postId',
                    name: 'postDetail',
                    component: PostDetail
                }
            ]
        }
    ]
})

export default router