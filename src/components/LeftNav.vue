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
                    <input type="text" class="input" placeholder="查找">
                </div>
            </div>
            <div class="search-btn" @click="showSearch">
                <font-awesome-icon icon="search" />
            </div>
        </div>
    </div>
    <!-- 文件列表 -->
    <div class="nav-body" ref='navBody' v-show="showBody">
        <nav-list v-for="(article, index) in articles" :key="article.id" :post="article"  @click.native="articleShow(article, index)"></nav-list>
    </div>
    <div class="toc" v-show="showToc" v-html="tocList"></div>
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
            toc: ""
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
            }
        },

        getArticleList() {
            this.$axios.get(this.links).then((res) => {
                const result = res.data;
                if (result.code === 0) {
                if (this.articles.length === 0) {
                    this.articles = result.info.data
                } else {
                    this.articles = this.articles.concat(result.info.data)
                }
                this.articleShow(this.articles[0], 0);
                this.links = result.info.links.next
                this.flag = true
                }
            });
        },
        articleShow(data, index) {
            if (index % 5 == 0) {
                this.navBody.scrollTop = 150 * index;
            }
            
            this.$store.commit('setArticle', {articleId: data.id});
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
    }
    .nav-title {
        text-align: center;
        display: inline-block;
        width: 170px;
    }
    .blog-search {
        display: inline-block;
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
            line-height: 35px;
            a {
                padding-left: 20px; 
                width: 100%;
                display: inline-block;
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
