<template>
  <div>
    <s-menu :menu="menus" style="padding: 16px 0px;"></s-menu>
  </div>
</template>
<script>
import SMenu from "./index";
export default {
  components: { SMenu },
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
