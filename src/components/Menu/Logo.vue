<template>
  <div class="logo-container">
    <transition name="logoFade">
      <router-link v-if="collapse" class="logo-link" to="/">
        <img v-if="logo" :src="logo" class="logo" />
        <h1 v-else class="title">{{title}}</h1>
      </router-link>
      <router-link v-else class="logo-link" to="/">
        <img v-if="logo" :src="logo" class="logo" />
        <h1 class="title">{{title}}</h1>
      </router-link>
    </transition>
  </div>
</template>
<script>
import logo from "@/assets/logo.png";
export default {
  name: "SideMenuLogo",
  props: {
    collapse: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      title: "Ele Pro V1",
      logo: logo
    };
  }
};
</script>
<style lang="less" scoped>
// 过渡的动画效果
.logoFade-enter-active {
  transition: opacity 1.5s;
}

.logoFade-enter,
.logoFade-leave-to {
  opacity: 0;
}
.logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  .logo-link {
    height: 100%;
    width: 100%;

    .logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    .title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
