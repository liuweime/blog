<template lang="html">
  <div class="container">
    <div class="nav-header">
        <!-- 切换视图 -->
        <div class="nav-switch" @click="switchView">
            <font-awesome-icon :icon="switchIcon" />
        </div>

        <!-- 标题 -->
        <div class="nav-title">{{navName}}</div>

        <!-- 搜索 -->
        <div class="blog-search">
            <div class="search-main" v-show="isSearch">
                <div class="search-cancel" @click="closeSearch">
                    <font-awesome-icon icon="angle-left" />
                </div>
                <div class="search-input">
                    <input type="text" class="input" placeholder="查找" v-model="search">
                </div>
            </div>
            <div class="search-btn" @click="showSearch">
                <font-awesome-icon icon="search" />
            </div>
        </div>
    </div>
    <!-- 文件列表 -->
    <div class="nav-body" ref='navBody'>
        <!-- 文章列表 -->
        <div class="nav-content"  v-show="showBody">
            <nav-list v-for="(article) in articles" :key="article.id" :post="article"  @click.native="articleShow(article.id, $event)"></nav-list>
            <!-- 更多 -->
            <div class="more" @click="loadMore()" v-show="flag">more...</div>
        </div>
        <!-- 文章导航 -->
        <div class="toc" v-show="showToc" v-html="tocList"></div>  
    </div>
    
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import NavList from './NavList'
export default {
    name: "LeftNav",
    mounted() {
        this.getArticleList();
        this.navBody = this.$refs.navBody;
    },
    computed: {
        tocList() {
            return this.$store.state.toc;
        }
    },
    data() {
        return {
            navName: "文件",
            switchIcon: 'list-ol',
            isNav: true,
            isSearch: false,
            showBody: true,
            showToc: false,
            nav: this.$store.state.nav,
            links: this.$store.state.api.article.index,
            articles: [],
            navBody: null,
            toc: "",
            flag: false,
            search: ""
        }
    },
    methods: {
        switchView() {
            if (this.isNav) {
                this.switchIcon = 'sitemap';
                this.navName = '大纲';
            } else {
                this.switchIcon = 'list-ol';
                this.navName = '文件';
            }
            this.isNav = !this.isNav;
            this.showBody = !this.showBody;
            this.showToc = !this.showToc;
        },

        showSearch() {
            if (!this.isSearch) {
                this.isSearch = true;
            }
        },

        closeSearch() {
            if (this.isSearch) {
                this.isSearch = false;
                this.search = "";
            }
        },

        getArticleList() {
            if (!this.links) {
                return false;
            }
            this.$axios.get(this.links).then((res) => {
                const result = res.data;
                if (result.code === 0) {
                    if (this.articles.length === 0) {
                        this.articles = result.info.data
                    } else {
                        this.articles = this.articles.concat(result.info.data)
                    }

                    // 显示
                    const articleId = this.$store.state.articleId ? this.$store.state.articleId : this.articles[0].id;
                    this.articleShow(articleId);
                    
                    if (result.info.links.next) {
                        this.links = result.info.links.next
                        this.flag = true;
                    } else {
                        this.links = null;
                        this.flag = false;
                    }
                }
            });
        },
        articleShow(articleId, e) {
            if (e && e.screenY > screen.height * 3/4) {
                this.navBody.scrollTop = this.navBody.scrollTop + 500;
            }
            
            this.$store.commit('setArticle', {articleId: articleId});
        },
        loadMore() {
            this.getArticleList();
        },
        ...mapMutations([
            'setArticle'
        ])
    },
    components: {
        NavList
    },
}
</script>

<style lang="scss">
@import '../assets/variable.scss';
.nav-header {
    height: 50px;
    line-height: 50px;
    position: relative;
    div {
        display: inline-block;
    }
    .nav-switch {
        cursor: pointer;
        width: 50px;
        text-align: center;
        float: left;
    }
    .nav-title {
        text-align: center;
        float: left;
        width: 55%;
    }
    .blog-search {
        float: right;
        width: 50px;
        .search-btn {
            width: 50px;
            text-align: center;
            cursor: pointer;
        }
        .search-main {
            width: 270px;
            height: 50px;
            background-color: $backgroundColor;
            position: absolute;
            left: 0;
            .search-cancel, .search-input {
                display: inline-block;
            }
            .search-cancel {
                width: 50px;
                text-align: center;
                cursor: pointer;
            }
            .search-input {
                width: 220px;
                input {
                    width: 200px;
                    background-color: transparent;
                    padding-left: 5px;
                    border: none;
                    border-bottom: 1px solid $borderColor;
                    outline:medium;
                }
                input::-webkit-input-placeholder { /* WebKit browsers */
                  color: #bebebe;
                  font-size: 16px;
                }
            }
        }
    }
}
.nav-body {
    overflow-x: hidden;
    overflow-y: scroll;
    height: 95vh;
    .more {
        width: 100%;
        height: 35px;
        background: #ecebe5;
        line-height: 35px;
        text-align: center;
        border-top: 1px solid #e2e2e1;
        color: #333;
        cursor: pointer;
    }
    .more:hover {
        background: #e2e2e2;
    }
}
.toc {
    overflow-x: hidden;
    margin-top: 10px;
    ul {
        text-decoration: none;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
            width: 90%;
            line-height: 35px;
            a {
                padding-left: 20px; 
                width: 100%;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            a:hover {
                background: #e4e4e1;
                text-decoration: underline;
            }
            ul li a {
                padding-left: 40px;
            }
        }
    }
    a {
        color: #252525;
        text-decoration: none;
    }
}
</style>
