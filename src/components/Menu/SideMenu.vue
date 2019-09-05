<template>
  <div>
    <Logo :collapsed="collapsed" />
    <side-menu-item :menu="menus" :collapsed="collapsed" id="domSideBar"></side-menu-item>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Logo from "./Logo";
import SideMenuItem from "./SideMenuItem";

export default {
  components: { Logo, SideMenuItem },
  props: {
    menus: {
      type: Array,
      required: true
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>
<style>
</style>
