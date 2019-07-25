<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
*::before,
*::after {
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
