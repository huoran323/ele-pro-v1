<template>
  <div id="userLayout">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <!-- <img src="~@/assets/logo.svg" class="logo" alt="logo" /> -->
            <span class="title" style="color: #4592fe">VUE 后台管理系统</span>
          </a>
        </div>
        <div class="desc" style="color: #666">---不积跬步，无以至千里；不积小流，无以成江海</div>
      </div>

      <router-view></router-view>

      <!-- <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">Copyright &copy; 2018 白鹭学园技术组出品</div>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  name: "UserLayout",
  mounted() {
    document.body.classList.add("userLayout");
  },
  beforeDestroy() {
    document.body.classList.remove("userLayout");
  }
};
</script>
<style lang="less" scoped>
#userLayout {
  height: 100%;

  .container {
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/pageBg/bg.png) no-repeat 50%;
    // background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    // background: #f0f2f5 url(~@/assets/pageBg/login.jpeg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;
      margin: 0 auto;
      width: 400px;

      .header {
        height: 44px;
        line-height: 44px;

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
