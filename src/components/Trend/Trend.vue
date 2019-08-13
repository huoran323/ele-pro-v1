<template>
  <div class="content">
    <span>
      <slot name="term"></slot>
      <span class="item-text">
        <slot></slot>
      </span>
    </span>
    <span :class="[flag]">
      <i :class="`el-icon-caret-${flag}`"></i>
    </span>
  </div>
</template>
<script>
export default {
  name: "Trend",
  props: {
    /**
     * 上升下降标识：top|bottom
     */
    flag: {
      type: String,
      required: false
    }
  }
};
</script>
<style lang="less" scoped>
@import "index";
</style>


