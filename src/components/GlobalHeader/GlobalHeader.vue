<template>
  <transition>
    <div>
      <i
        :class="collapsed ?  'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="toggle"
        class="trigger"
      />
    </div>
  </transition>
</template>
<script>
export default {
  name: "GlobalHeader",
  components: {},
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
