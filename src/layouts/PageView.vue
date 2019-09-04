<template>
  <div>
    <!-- 控制头部显示与隐藏 -->
    <page-header v-if="!$route.meta.hiddenHeaderContent" :title="pageTitle" class="page-header">
      <!-- 自定义头部 -->
      <!-- 插槽是父组件向子组件插入：除非子组件模板包含至少一个 <slot> 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身。
        
      <slot name="">标签要放在子组件中，插入的标签放在父组件中<slot="">，并且通过name属性匹配插槽-->
      <!-- slot标签用来接收父组件的插槽，name为headerContent；内部的slot属性是向page-header插入插槽的位置，name为content -->
      <!-- 此处以Workplace为例，因为在Workplace模块中引入了PageView,所以Workplace模块是父组件，PageView是子组件
            <slot name="headerContent">对应的是Workplace模块中的插槽；后面的slot属性对应的是Workplace模块中的头部div模块，故是父组件，插在PageHeader模块中<slot>的位置
      -->
      <slot name="headerContent" slot="content"></slot>

      <!-- 此处的slot对应的是PageHeader中的<slot>标签 -->
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
