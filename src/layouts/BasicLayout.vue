<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <side-menu :menus="menus" mode="vertical"></side-menu>
      </el-aside>

      <el-container>
        <el-header></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import SideMenu from "@/components/Menu/SideMenu";
import { mapState } from "vuex";
export default {
  components: { SideMenu },
  data() {
    return {
      menus: []
    };
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    })
  },
  created() {
    this.menus = this.mainMenu.find(item => item.path === "/").children;
  }
};
</script>
<style>
</style>

