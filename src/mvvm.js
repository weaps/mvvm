import Observer from './observer/observer'
import Compile from './compile/cpmpile'
class MVVM {
  // MVVM桥梁作用，用于编译和观察监听
  constructor(options) {
    // 一上来就把可用的数据绑定到当前实例上
    this.$el = options.el
    this.$data = options.data
    // 2、数据劫持
    new Observer(this.$data)
    // 3、模板编译
    if (this.$el) {
      // 判断当前实例传入的dom是否有效
      new Compile(this)
    }
  }
}

window.onload = function() {
  let vm = new MVVM({
    el: '#app',
    data: {
      msg: {
        a: {
          b: {
            c: 'hello'
          }
        }
      }
    }
  })
}