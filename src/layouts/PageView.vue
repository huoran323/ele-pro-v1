<template>
  <div>
    <!-- 控制头部显示与隐藏 -->
    <page-header v-if="!$route.meta.hiddenHeaderContent" :title="pageTitle" class="page-header">
      <!-- 自定义头部 -->
      <!-- slot标签用来接收父组件的插槽，name为headerContent；内部的slot属性是向page-header插入插槽的位置，name为content -->
      <slot slot="content" name="headerContent"></slot>
      <div slot="content">
        <p style="font-size: 14px;color: rgba(0,0,0,.65)">{{ description }}</p>
      </div>
    </page-header>
    <!-- 页面主体内容 -->
    <div class="content">
      <slot>
        <keep-alive>
          <!-- 通过设置ref属性，可以使用$refs获取对应子组件的信息 -->
          <router-view ref="content" />
        </keep-alive>
      </slot>
    </div>
  </div>
</template>
<script>
import PageHeader from "@/components/PageHeader";
export default {
  name: "PageView",
  components: { PageHeader },
  data() {
    return {
      pageTitle: null,
      description: null
    };
  },
  props: {
    // 用来控制面包屑下面显示的左侧标签，如果传递false，则不显示
    title: {
      type: [String, Boolean],
      default: true
    }
  },
  mounted() {
    this.getPageMeta();
  },
  updated() {
    this.getPageMeta();
  },
  methods: {
    getPageMeta() {
      // 获取页面的title值
      this.pageTitle =
        typeof this.title === "string" || !this.title
          ? this.title
          : this.$route.meta.title;

      const content = this.$refs.content;

      if (content) {
        if (content.pageMeta) {
          Object.assign(this, content.pageMeta);
        } else {
          this.description = content.description;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  margin: 24px 24px 0;
}
.page-header {
  margin-left: 0px;
}
</style>
