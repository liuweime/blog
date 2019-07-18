<template lang="html">
    <div class="container">
        <div class="row nav">
            <router-view/>
        </div>
        <div class="row body"></div>
    </div>
</template>

<script>
export default {
    name: "Layout",
    data() {
        return {}
    },
    methods: {}
}
</script>

<style lang="scss">
@import '../assets/variable.scss';
.nav {
    width: 270px;
    height: 100vh;
    border-right: 1px dashed $borderColor;
}
</style>
