import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout.vue'
import LeftNav from '@/components/LeftNav.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: [{
          path: '',
          name: 'nav',
          component: LeftNav
        }]
    }
  ]
})
