<template>
  <div>
    <slot name="subtitle">
      <div></div>
    </slot>
    <div class="number-info-value">
      <span>{{total}}</span>
      <span class="sub-total">
        {{subTotal}}
        <i :class="`el-icon-caret-${flag}`"></i>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "NumberInfo",
  props: {
    total: {
      type: Number,
      required: true
    },
    subTotal: {
      type: Number,
      required: true
    },
    /**
     * 上升下降标识：top|bottom
     */
    flag: {
      type: String,
      required: false,
      default: "top"
    }
  }
};
</script>
<style lang="less" scoped>
.number-info-value {
  margin-top: 4px;
  font-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;

  & > span {
    color: #333;
    display: inline-block;
    line-height: 32px;
    height: 32px;
    font-size: 24px;
    margin-right: 32px;
  }

  .sub-total {
    color: #666;
    font-size: 20px;
    vertical-align: top;
    margin-right: 0;
    i {
      font-size: 12px;
      transform: scale(0.82);
      margin-left: 4px;
    }
    :global {
      .el-icon-caret-top {
        color: #f5222d;
      }
      .el-icon-caret-bottom {
        color: #49bc19;
      }
    }
  }
}
</style>