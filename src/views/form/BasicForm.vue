<template>
  <div>基础表单页面
    <el-button @click="test()">测试接口</el-button>
  </div>
</template>
<script>
  import * as api from "@/api/testApi.js";

export default {
  name: "BasicForm",
  data() {
    return {
      description:
        "表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    };
  },
  methods: {
    test() {
      api.getUserMenu().then(res => {
        console.log('res --', res);
      })
    }
  }
};
</script>
<style>
</style>

