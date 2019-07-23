<template>
  <div class="main">
    <el-form :model="validateForm" ref="validateForm" class="user-layout-login">
      <el-tabs style="textAlign:center;borderBottom:unset">
        <el-tab-pane label="账号密码登录">
          <el-form-item prop="username" :rules="[
          {required: true, message: '请输入账号'}]">
            <el-input placeholder="账号：admin" v-model="validateForm.username">
              <i slot="prefix" class="el-icon-user"></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="password" :rules="[
          {required: true, message: '请输入密码'}]">
            <el-input placeholder="密码：admin" v-model="validateForm.password">
              <i slot="prefix" class="el-icon-lock"></i>
            </el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="手机号登录">手机号登录</el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-checkbox v-model="rememberMe">自动登录</el-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >忘记密码</router-link>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="login-button" @click="submitForm('validateForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      validateForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
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

