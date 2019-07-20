import Vue from 'vue'
import Router from 'vue-router'
import LeftNav from '@/components/LeftNav.vue'
import PostBody from '@/components/PostBody.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        nav: LeftNav,
        body: PostBody
      }
    }
  ]
})
