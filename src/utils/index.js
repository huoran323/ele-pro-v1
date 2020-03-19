/**
 * 防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {number} wait 延迟时间
 * @param {boolean} immediate 是否立即执行
 * @return {*}
 * 使用样例： 
 *    import { debounce } from 'xxx'
 
      <div @click="toDoSth(vm)"></div>

      export default {
        data: {
          return {
            vm: this
          }
        },
        methods: {
          toDoSth: debounce((vm) => {
            // 这里将当前组件实例当参数传入
            // 就可以使用实例中定义的一些属性、方法
            // 补充一下，这里如果换成非箭头函数的写法，也可以直接访问实例。
          }, 
          500, 
          true
          )
        }
      }
 *    
 */
// 防抖函数
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
