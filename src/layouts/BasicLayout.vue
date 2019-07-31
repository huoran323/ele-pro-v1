<template>
  <el-container :class="classObj" class="container">
    <el-aside class="container-side" :style="{width:'auto'}">
      <SideMenu class="side-menu" :menus="menus" :collapsed="collapsed"></SideMenu>
    </el-aside>

    <el-container>
      <el-header class="container-header">
        <global-header :collapsed="collapsed" @toggle="toggle" />
      </el-header>
      <el-main>
        <multi-tab></multi-tab>
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>
<script>
import SideMenu from "@/components/Menu/SideMenu";
import GlobalHeader from "@/components/GlobalHeader/GlobalHeader";
import MultiTab from "@/components/MultiTab";
import { mapState } from "vuex";
export default {
  components: { SideMenu, GlobalHeader, MultiTab },
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
    this.menus = this.mainMenu.find(item => item.path === "/").children;
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
    background-color: #304156;
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

  .container-header {
    border-bottom: solid 1px #e6e6e6;
  }
}
</style>

