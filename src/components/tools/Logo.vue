<template>
  <div>
    <router-link :to="{name: 'dashboard'}">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle">{{title}}</h1>
    </router-link>
  </div>
</template>
<script>
import LogoSvg from "@/assets/logo.svg";
export default {
  name: "Logo",
  components: { LogoSvg },
  props: {
    title: {
      type: String,
      default: "Ele Pro V1",
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
};
</script>
<style>
</style>
