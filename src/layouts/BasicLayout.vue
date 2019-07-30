<template>
  <el-container class="container">
    <el-aside class="container-side">
      <SideMenu class="side-menu" :menus="menus"></SideMenu>
    </el-aside>

    <el-container>
      <el-header class="container-header">
        <global-header :collapsed="true" />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>
<script>
import SideMenu from "@/components/Menu/SideMenu";
import GlobalHeader from "@/components/GlobalHeader/GlobalHeader";
import { mapState } from "vuex";
export default {
  components: { SideMenu, GlobalHeader },
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
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;

  .container-side {
    background-color: #304156;
    color: #333;
    text-align: left;
    line-height: 200px;
    height: 100%;
    width: 100%;
    font-size: 18px;

    .side-menu {
      // transition: width 0.28s;
      // width: $sideBarWidth !important;
      // background-color: $menuBg;
      // width: 100%;
      // height: 100%;
      // position: fixed;
      border-right: solid 0px #e6e6e6 !important;
      font-size: 18px;
      // top: 0;
      // bottom: 0;
      // left: 0;
      // z-index: 1001;
      // overflow: hidden;
    }
  }

  .container-header {
    border-bottom: solid 1px #e6e6e6;
  }
}
</style>

