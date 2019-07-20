<template lang="html">
    <div class="nav-li" :class="{active: isActive}">
        <div class="head">
            <span class="category">{{post.category}}</span>
            <span class="datetime">{{post.created_at}}</span>
        </div>
        <div class="title">{{post.title}}</div>
        <div class="desc">{{post.excerpt}}</div>
    </div>
</template>

<script>

export default {
    name: "NavList",
    props: ["post"],
    computed: {
        isActive() {
            if (this.$store.state.articleId == this.post.id) {
                return true;
            }

            return false;
        }
    },
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
.nav-li:hover {
    color: #444;
}
.active {
    color: #232323;
    background-color: #e4e4e1;
}
</style>