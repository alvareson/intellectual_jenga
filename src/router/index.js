import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/choices/:category',
      name: 'choice',
      component: () => import('../views/ChoiceView.vue'),
      props: true,
    },
    {
      path: '/question/:category/:questionNumber',
      name: 'question',
      component: () => import('../views/QuestionView.vue'),
      props: true,
    },
  ]
})

export default router
