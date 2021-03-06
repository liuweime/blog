import Vue from 'vue'
import App from './App.vue'
import store from './Store'
import router from './Router'
import axios from 'axios'
import 'normalize.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)

require('./mock');
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

// Vue.directive('comment', (el) => {
//   let doms = el.querySelectorAll('p');
//   doms.forEach((dom) => {
//     if (dom.getElementsByClassName('comment-icon').length == 0) {
//       let comment = document.createElement('div');
//       comment.className = 'comment-icon';
//       let icon = document.createElement('div');
//       icon.className = 'icon';
//       icon.innerText = '+';
//       comment.appendChild(icon);
//       dom.appendChild(comment);
//     }
    
//   })
// });

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
