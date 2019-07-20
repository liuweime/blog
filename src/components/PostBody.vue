<template lang="html">
    <div class="post-body">
        <div class="post-title">
            <h1>{{articles.title}}</h1>
        </div>
        <div class="post-body">
            <vue-markdown id="article" :source="articles.content" :toc="true" v-on:toc-rendered="toAllRight" v-highlight></vue-markdown>
        </div>
    </div>
     
</template>

<script>
import { mapMutations } from 'vuex'
import VueMarkdown from 'vue-markdown'
export default {
    name: "PostBody",
    data() {
        return {
            article: '',
            id: 0,
            show: false,
            tesdt: '## 这里是要展示的markdown文字，也可以通过props传递'
        }
    },
    computed: {
        articles() {
            if (this.$store.state.articleId && this.articleId != this.$store.state.articleId) {
                this.articleId = this.$store.state.articleId;
                this.getPost(this.$store.state.articleId)
            }

            return this.article;
        }
    },
    methods: {
        getPost(id) {
            if (!id) {
                return null;
            }
            this.$axios.get(this.$store.state.api.article.show+id).then((res) => {
                const result = res.data;
                if (result.code === 0) {
                    this.article = result.info.data
                }
            });
        },
        toAllRight: function(tocHtmlStr) {
            this.$store.commit('setToc', {
                toc: tocHtmlStr
            });
        },
        ...mapMutations([
            'setToc'
        ])
    },
    components: {
        VueMarkdown  // 声明组件
    }
}
</script>

<style lang="scss">
    .post-body {
        margin-top: 50px;
        width: 960px;
        margin: 0 auto;
        .post-title {
            h1 {
                font-size: 1.875em;
                /*30 / 16*/
                line-height: 1.6em;
                /* 48 / 30*/
                margin-top: 2em;
                margin-bottom: 1.875em;
                padding-bottom: 0.8125em;
                text-align: center;
                border-bottom: 1px solid #c1c0ba;
            }
        }
    }
</style>