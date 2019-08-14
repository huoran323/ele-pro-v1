<template>
  <div>
    <!-- 控制头部显示与隐藏 -->
    <page-header v-if="!$route.meta.hiddenHeaderContent" :title="pageTitle" class="page-header">
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
  mounted() {
    this.getPageMeta();
  },
  updated() {
    this.getPageMeta();
  },
  methods: {
    getPageMeta() {
      // 获取页面的title值
      this.pageTitle = this.$route.meta.title;

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
