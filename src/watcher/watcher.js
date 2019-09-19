import Dep from '../dep/dep'
// 观察者的目的就是给需要变化的那个元素增加一个观察者，当数据变化后，执行对应的方法
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    // 获取下老的数据
    this.oldValue = this.getData()
  }
  // 获取当前数据
  getData() {
    return this.getVmData(this.vm, this.expr)
  }
  // 根据名称，获取到data实例中的对应数据
  getVmData(vm, type) {
    console.log(type)
    type = type.split('.')
    return type.reduce((prev, next) => {
      return prev[next]
    },vm.data)
  }
  // 对外暴露更新方法
  updater() {
    let newValue = this.getData()
    // 用老值和新值比较，如果发生变化，那么就调用相应的方法
    if (newValue !== this.oldValue) {
      this.cb(newValue)
    }
  }
}

export default Watcher
