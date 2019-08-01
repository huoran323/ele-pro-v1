<template>
  <div class="page-header">
    <div class="page-header-wrap">
      <breadcrumb></breadcrumb>
      <div class="detail">
        <div class="main" v-if="!$route.meta.hiddenHeaderContent">
          <div class="row">
            <h1 v-if="title" class="title">{{title}}</h1>
          </div>
          <div class="row">
            <div class="headerContent">
              <slot name="content"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Tools/Breadcrumb";
export default {
  name: "PageHeader",
  components: { Breadcrumb },
  props: {
    title: {
      type: [String, Boolean],
      required: false
    }
  }
};
</script>
<style lang="less" scoped>
.page-header {
  background: #fff;
  padding: 0px 10px 0;
  border-bottom: 1px solid #e8e8e8;

  .page-header-wrap {
    margin-left: 20px;

    .detail {
      display: flex;

      .main {
        width: 100%;
        flex: 0 1 auto;

        .row {
          display: flex;
          width: 100%;
        }

        .title {
          font-size: 20px;
          font-weight: 500;

          font-size: 20px;
          line-height: 28px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 16px;
          flex: auto;
        }

        .content,
        .headerContent {
          flex: auto;
          color: rgba(0, 0, 0, 0.45);
          line-height: 22px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
