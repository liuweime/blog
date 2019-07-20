<template>
  <div id="app">
    <div class="container">
      <div class="row nav">
          <router-view name="nav"></router-view>
      </div>
      <div class="row body">
          <router-view name="body"></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/variable.scss';
@import './assets/markdown.scss';
body {
  background-color: $backgroundColor;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  width: 100vw;
  .nav {
      float: left;
      width: 17%;
      height: 100vh;
      border-right: 1px dashed $borderColor;
  }
  .body {
    float: left;
    width: 79%;
    padding: 0px 20px;
    height: 100vh;
    overflow-y: scroll;
  }
}
</style>
