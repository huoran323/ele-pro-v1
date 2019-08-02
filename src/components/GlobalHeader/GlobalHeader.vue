<template>
  <transition>
    <div>
      <i
        :class="collapsed ?  'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="toggle"
        class="trigger"
      />
      <user-menu></user-menu>
    </div>
  </transition>
</template>
<script>
import UserMenu from "@/components/Tools/UserMenu";
export default {
  name: "GlobalHeader",
  components: { UserMenu },
  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    }
  }
};
</script>
<style lang="less" scoped>
.trigger {
  font-size: 26px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}
</style>
