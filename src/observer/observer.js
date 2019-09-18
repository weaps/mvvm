class Observer {
 constructor(data) {
   if (data && typeof data === 'object') {
     this.observer(data)
   }
 }
 observer(data) {
   Object.keys(data).map(key => {
     this.defineActive(data, key, data[key])
     // 如果当前value值是对象，需要再次遍历（递归）
     if (typeof data[key] === 'object') {
       this.observer(data[key]) // 深度遍历，递归
     }
   })
   // debugger
 }
  defineActive(obj, key, value) {
   let that = this
    Object.defineProperty(obj, key,{
      configurable:  true, // 该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false
      enumerable: true, // 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。
      //writable: true, // 当且仅当该属性的writable为true时，value才能被赋值运算符改变
      get() {
        return value
      },
      set(newValue) {
        if (newValue !== value) {
          that.observer(newValue) // 对新的赋值进行数据劫持
          value = newValue
        }
      }
    })
  }
}
export default Observer
