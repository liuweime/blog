import Vue from 'vue'
import Vuex from 'vuex'
import {nav} from '../common/config'
import {api} from '../common/api'
import {storage} from '../common/util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: api(),
    nav: nav.list,
    articleId: storage.get('articleId'),
    toc: ""
  },
  mutations: {
    setArticle(state, payload) {
      state.articleId = payload.articleId
      storage.set('articleId', payload.articleId);
    },
    setToc(state, payload) {
      state.toc = payload.toc;
    }
  },
  actions: {

  }
})
