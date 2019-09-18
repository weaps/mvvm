// 观察者的目的就是给需要变化的那个元素增加一个观察者，当数据变化后，执行对应的方法
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    // 获取下老的数据
    this.getOldData()
  }
  getOldData() {}
}

export default Watcher
