<template>
  <div>
    <Logo />
    <side-menu-item :menu="menus"></side-menu-item>
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
    }
  }
};
</script>
<style>
</style>
