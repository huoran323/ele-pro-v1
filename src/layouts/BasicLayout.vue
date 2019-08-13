<template>
  <el-container :class="classObj" class="container">
    <el-aside class="container-side" :style="{width:'auto'}">
      <SideMenu class="side-menu" :menus="menus" :collapsed="collapsed"></SideMenu>
    </el-aside>

    <el-container class="container-main">
      <el-header class="container-header">
        <global-header :collapsed="collapsed" @toggle="toggle" />
      </el-header>
      <el-main>
        <multi-tab></multi-tab>
        <!-- <breadcrumb></breadcrumb> -->
        <div class="main">
          <router-view></router-view>
        </div>
      </el-main>
      <!-- <el-footer></el-footer> -->
    </el-container>
  </el-container>
</template>
<script>
import Breadcrumb from "@/components/Tools/Breadcrumb";
import SideMenu from "@/components/Menu/SideMenu";
import GlobalHeader from "@/components/GlobalHeader/GlobalHeader";
import MultiTab from "@/components/MultiTab";
import { mapState } from "vuex";
export default {
  components: { SideMenu, GlobalHeader, MultiTab, Breadcrumb },
  data() {
    return {
      collapsed: false,
      menus: []
    };
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    classObj() {
      return {
        hideSidebar: !this.collapsed,
        openSidebar: this.collapsed
        // withoutAnimation: this.sidebar.withoutAnimation,
      };
    }
  },
  created() {
    // 获取左侧菜单栏
    this.menus = this.mainMenu.find(item => item.path === "/").children;
    // this.menus = this.mainMenu;
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;

  // .openSidebar {
  //   position: fixed;
  //   top: 0;
  // }

  // .hideSidebar .fixed-header {
  //   width: calc(100% - 54px);
  // }

  .container-side {
    background-color: #001525;
    color: #333;
    text-align: left;
    line-height: 200px;
    height: 100%;
    width: 100%;
    font-size: 0px;

    overflow: hidden;
    transition: width 800ms;

    .side-menu {
      border-right: solid 0px #e6e6e6 !important;
      font-size: 18px;
    }
  }

  .container-main {
    position: relative;
    // height: 100%;
    // width: 100%;
  }

  .container-header {
    border-bottom: solid 1px #e6e6e6;
  }

  .el-main {
    position: relative;
    padding: 0px 0px 0px 0px;
    height: 100%;
    width: 100%;
  }

  .main {
    padding: 0px 0px 0px 0px;
    // 设置主体内容的背景色
    // background-color: #eef0f3;
    position: relative;
    height: calc(100%-56px);
    // height: 100%;
    width: 100%;
  }
}
</style>

