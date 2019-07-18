<template lang="html">
    <div class="nav-li">
        <router-link :to="'/article/' + post.id">
        <div class="head">
            <span class="category">{{post.category}}</span>
            <span class="datetime">{{post.created_at}}</span>
        </div>
        <div class="title">{{post.title}}</div>
        <div class="desc">{{post.excerpt}}</div>
        </router-link>
    </div>
</template>

<script>

export default {
    name: "NavList",
    props: ["post"],
    data() {
        return {

        }
    },

    methods: {

    }
}
</script>

<style lang="scss">
@import '../assets/variable.scss';
.nav-li {
    height: 130px;
    padding: 10px;
    color: rgb(126, 126, 126);
    cursor: pointer;
    a {
        color: rgb(126, 126, 126);
        text-decoration: none;
    }
    a:hover {
        color: #444;
    }
    .head {
        height: 30px;
        line-break: 30px;
        span {
            font-size: 13px;
            display: inline-block;
        }
        span.category {
            width: 55%;
            text-align: left;
        }
        span.datetime {
            padding-right: 5px;
            text-align: right;
        }
    }
    .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 10px 0;
    }
    .desc {
        font-size: 14px;
    }
}
</style>