<template>
  <div class="main">
    <el-form :model="validateForm" ref="validateForm" class="user-layout-login">
      <el-tabs
        v-model="activeName"
        style="textAlign:center;borderBottom:unset"
        @tab-click="handleClick"
      >
        <!-- <el-tab-pane label="账号密码登录" name="account"> -->

        <el-form-item prop="username" :rules="[
          {required: true, message: '请输入账号'}]">
          <el-input placeholder="账号：admin | user" v-model="validateForm.username">
            <i slot="prefix" class="el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="[
          {required: true, message: '请输入密码'}]">
          <el-input placeholder="密码：123456" v-model="validateForm.password" type="password">
            <i slot="prefix" class="el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <!-- </el-tab-pane> -->

        <!-- <el-tab-pane label="手机号登录" name="mobile">
          <el-form-item prop="phone" :rules="[{required: true, message: '请输入手机号'}]">
            <el-input placeholder="手机号" v-model="validateForm.phone">
              <i slot="prefix" class="el-icon-mobile-phone"></i>
            </el-input>
          </el-form-item>

          <el-row :gutter="16">
            <el-col :span="16">
              <el-form-item prop="captcha" :rules="[{required: true, message: '请输入验证码'}]">
                <el-input placeholder="验证码" v-model="validateForm.captcha">
                  <i slot="prefix" class="el-icon-message"></i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button>获取验证码</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>-->
      </el-tabs>

      <el-form-item>
        <el-checkbox>自动登录</el-checkbox>
        <!-- <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >忘记密码</router-link>-->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="login-button" @click="submitForm('validateForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "account",
      validateForm: {
        username: "",
        password: "",
        phone: "",
        captcha: ""
      }
    };
  },
  methods: {
    ...mapActions(["Login"]),
    handleClick(tab) {
      this.activeName = tab.name;
    },

    submitForm(formName) {
      const { activeName, validateForm, Login } = this;
      const validateFieldsKey =
        activeName === "account"
          ? ["username", "password"]
          : ["phone", "captcha"];
      const parameter =
        activeName === "account"
          ? { username: validateForm.username, password: validateForm.password }
          : { phone: validateForm.phone, captcha: validateForm.captcha };
      // 对部分表单进行验证
      let _self = this;
      Promise.all(
        validateFieldsKey.map(item => {
          let p = new Promise(function(resolve, reject) {
            _self.$refs.validateForm.validateField(item, error => {
              resolve(error);
            });
          });
          return p;
        })
      ).then(data => {
        // data 里是各个字段的验证错误信息, 如果为空串则认为验证通过, 如果数组里全为空串则所有验证通过
        // 判断data 里是否全是空串
        let empty = false;
        data.map(item => {
          if (item) {
            empty = true;
          } else {
            empty = false;
          }
        });
        if (!empty) {
          Login(parameter)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err));
        }
      });
    },
    loginSuccess(res) {
      
      this.$router.push({ name: "Dashboard" });
      // 延迟一秒显示欢迎信息
      setTimeout(() => {
        this.$notify({
          title: "欢迎",
          message: "欢迎回来",
          type: "success"
        });
      }, 1000);
    },
    requestFailed(err) {
      this.$notify.error({
        title: "错误",
        message:
          ((err.response || {}).data || {}).message ||
          "请求出现错误，请稍后再试"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>
