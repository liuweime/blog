<template lang="html">
    <div class="post-body" >
        <div class="post-article" :class="{move: isMove}">
            <div class="post-title">
                <h1>{{articles.title}}</h1>
            </div>
            <div class="post-content">
                <vue-markdown id="article" :source="articles.content" :toc="true" v-on:toc-rendered="toAllRight" v-highlight v-comment="comment"></vue-markdown>
            </div>
        </div>

        <div class="post-comment">
            <comment :top="top"></comment>
        </div>
    </div>
     
</template>

<script>
import { mapMutations } from 'vuex'
import VueMarkdown from 'vue-markdown'
import comment from './comment';
export default {
    name: "PostBody",
    data() {
        return {
            article: '',
            id: 0,
            show: false,
            articleId: 0,
            tesdt: '## 这里是要展示的markdown文字，也可以通过props传递',
            isMove: false,
            top: 0
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
        comment(e) {
            this.isMove = true;
            let top = e.clientY;
            this.$store.commit('setTop', {
                top: top
            });
            if (e.target.className == 'icon') {
                e.target.parentElement.setAttribute('class', 'comment-icon test')
            } else {
                e.target.setAttribute('class', 'comment-icon test')
            }
        },
        ...mapMutations([
            'setToc',
            'setTop'
        ])
    },
    directives: {
        comment: {
            update: (el, binding) => {
                
                let doms = el.querySelectorAll('p');
                doms.forEach((dom) => {
                    if (dom.getElementsByClassName('comment-icon').length == 0) {
                        let comment = document.createElement('div');
                        comment.className = 'comment-icon';
                        let icon = document.createElement('div');
                        icon.className = 'icon';
                        icon.innerText = '+';
                        comment.appendChild(icon);
                        comment.addEventListener('click', binding.value, true)
                        dom.appendChild(comment);
                    }
                });
            }
        }
    },
    components: {
        VueMarkdown,
        comment
    }
}

</script>

<style lang="scss">
    
    .post-body {
        width: 100%;
        margin-top: 50px;
        .post-article {
            width: 70%;
            position: absolute;
            left: 15%;
        }
        .move {
            left: 5% !important;
            .test {
                display: none !important;
            }
        }
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
        .post-content {
            #article>p {
                position: relative;
                .comment-icon {
                    display: none;
                    position: absolute;
                    right: -40px;
                    top: 0;
                    bottom: 0;
                    width: 64px;
                    .icon {
                        float: right;
                        width: 25px;
                        height: 25px;
                        text-align: center;
                        line-height: 25px;
                        border: 1px solid #dadad8;
                        color: #505050;
                        background: #e4e4e1;
                        cursor: pointer;
                    }
                }
            }
            #article>p:hover .comment-icon{
                display: block;
            }
        }
    }
</style>