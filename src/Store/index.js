import Vue from 'vue'
import Vuex from 'vuex'
import {nav} from '../common/config'
import {api} from '../common/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: api(),
    nav: nav.list,
    articleId: null,
    toc: ""
  },
  mutations: {
    setArticle(state, payload) {
      state.articleId = payload.articleId
    },
    setToc(state, payload) {
      state.toc = payload.toc;
    }
  },
  actions: {

  }
})
