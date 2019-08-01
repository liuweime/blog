<template lang="html">
    <div class="comment" :style="{top: top + 'px'}">
        <div class="name"><input type="text" placeholder="Name"></div>
        <div class="email"><input type="text" placeholder="Email"></div>
        <div class="content"><textarea name="" id="" cols="30" rows="10" placeholder="Content"></textarea></div>
    </div>
</template>
<script>
export default {
    name: "comment",
    data() {
        return {}
    },
    computed: {
        top() {
            return this.$store.state.top;
        }
    },
    methods: {
        
    }
}
</script>
<style lang="scss">
.comment {
    position: absolute;
    right: 20px;
    top: 240px;
    input, textarea{
        width: 250px;
        padding: 5px;
        font-size: 14px;
        border: 2px solid transparent;
        border-bottom-color: #666;
        outline: none;
        margin-bottom: 4px;
        background: #eaeae6; 
    }
    input {
        height: 20px;
    }
    textarea {
        height: 100px;
        resize: none;  
    }
}
</style>