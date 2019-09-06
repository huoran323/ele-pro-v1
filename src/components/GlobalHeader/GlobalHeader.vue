<template>
  <transition>
    <div>
      <i
        :class="collapsed ?  'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="toggle"
        class="trigger"
        id="domColapse"
      />
      <!-- 面包屑放在头部上面 -->
      <!-- <breadcrumb class="breadcrumb"></breadcrumb> -->
      <user-menu></user-menu>
    </div>
  </transition>
</template>
<script>
import UserMenu from "@/components/Tools/UserMenu";
import Breadcrumb from "@/components/Tools/Breadcrumb";
export default {
  name: "GlobalHeader",
  components: { UserMenu, Breadcrumb },
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
.breadcrumb {
  float: left;
  position: absolute;
  top: 23px;
  left: 60px;
}
</style>
