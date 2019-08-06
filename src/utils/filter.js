import Vue from "vue";

// 过滤器 将整数格式化4455 => 4,455
Vue.filter("NumberFormat", function(value) {
  if (!value) {
    return "0";
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
  return intPartFormat;
});
