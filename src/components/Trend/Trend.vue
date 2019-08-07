<template>
  <div>
    <span>
      <slot name="term"></slot>
      <span class="item-text">
        <slot></slot>
      </span>
    </span>
    <span></span>
  </div>
</template>
<script>
export default {
  name: "Trend",
  props: {
    /**
     * 上升下降标识：up|down
     */
    flag: {
      type: String,
      required: false
    }
  }
};
</script>
<style lang="less" scoped>
</style>


