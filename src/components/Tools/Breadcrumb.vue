
<template>
  <el-breadcrumb class="breadcrumb" id="domBread">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
      <router-link
        v-if="item.name != name && index != 1 "
        :to="{ path: item.path === '' ? '/' : item.path }"
      >{{$t(`menu.${item.meta.title}`)}}</router-link>
      <span v-else>{{$t(`menu.${item.meta.title}`)}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      name: "",
      breadList: []
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {

      // console.log(this.$route);
      this.breadList = [];

      this.name = this.$route.name;
      this.$route.matched.forEach(item => {
        this.breadList.push(item);
      });
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>
<style lang="less" scoped>
.breadcrumb {
  margin-bottom: 16px;
  font-size: 16px;
}
</style>
