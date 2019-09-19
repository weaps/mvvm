import util from './compile-util'
import Watcher from '../watcher/watcher'
import Dep from '../dep/dep'
class Compile {
  constructor(options) {
    // 判断当前传入的el是字符串还是node节点
    this.el = util.isElementNode(options.$el) ? options.$el : document.querySelector(options.$el)
    this.data = options.$data
    // 判断如果能获取到这个元素，才进行编译
    if (this.el) {
      // 1、先把真实的DOM元素移入的文档碎片中（内存）
      let fragment = this.nodeToFragment(this.el)

      // 2、编译html, 提取自定义指令v-....、{{text}}等
      this.compile(fragment)

      // 将编译好的文档碎片dom在插入到真实DOM元素中
      this.el.appendChild(fragment)
    }
  }
  // 核心的方法 ----------------------------------
  // 编译元素
  compileElement(node) {
    // 查看元素是否有v-xxx自定义指令
    let attr = Array.from(node.attributes)
    attr.map(nodeName => {
      let name = nodeName.name
      if (util.isDirective(name)) {
        // 获取自定义指令名称，如： v-text => text, v-model => model
        let [, type] = name.split('-')
        // compileUtil 编译自定义指令工具方法的集合
        compileUtil.directive(node, this, nodeName.value, type)
      }
    })
  }
  // 编译文本
  compileText(node) {
    let text = node.data
    let reg = /\{\{([^}]+)\}\}/g
    if (reg.test(text)) {
      compileUtil.expr(node, this, text)
    }
  }
  // 编译方法
  compile(fragment) {
    let fragmentList = Array.from(fragment.childNodes)
      // 遍历node节点
      fragmentList.map(node => {
        // 首先把注释节点过滤掉
        if (node.nodeType === 8) return false
        // 判断是元素节点还是文本节点
        if (util.isElementNode(node)) {
          // 还需要在判断当前元素节点是否包含子元素，如果有子元素，需要再次递归遍历
          if (node.childNodes.length) {
            this.compile(node) // 递归遍历
          }
          // 编译元素节点
          this.compileElement(node)
        } else {
          // 编译文本节点
          this.compileText(node)
        }
      })
  }
  // 编译前，把dom元素移动到文档碎片中
  nodeToFragment(el) {
    let firstChild;
    let fragment = document.createDocumentFragment()
    while(firstChild = el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }
}

const compileUtil = {
  // 自定义指令方法集合，如：v-model、v-text、v-html、
  directive(node, vm, value, type) {
    type = type.slice(0,1).toUpperCase() + type.slice(1)
    let fn = this.updater[`updater${type}`]
    new Watcher(vm, value, (newVal) => {
      fn && fn(node, this.getVmData(vm, newVal))
    })
    fn && fn(node, this.getVmData(vm, value))
  },
  // 表达式方法 {{data}}
  expr(node, vm, value) {
    this.getExprName(value)
    // debugger
    let fn = this.updater['updaterExpression']
    new Watcher(vm)
    fn && fn(node, this.getExpressionData(vm, value))
  },
  updater: {
    // 表达式更新 {{test}}
    updaterExpression(node, value) {
      node.textContent = value
    },
    // 文本更新
    updaterText(node, value) {
      // debugger
      node.textContent = value
    },
    // 输入框更新
    updaterModel(node, value) {
      node.value = value
    },
    // html更新
    updaterHtml() {}
  },
  // 根据名称，获取到data实例中的对应数据
  getVmData(vm, type) {
    console.log(type)
    type = type.split('.')
    return type.reduce((prev, next) => {
      return prev[next]
    },vm.data)
  },
  // 获取表达式双括号中的数据字段，如： {{msg}} => msg
  getExpressionData(vm, value) {
    value = value.trim()
    let len = (value && value.length) || 0
    let data =  value.substring(2, len - 2)
    // 获取到name后，调用getVmData获取对应的数据，并返回
    return this.getVmData(vm, data)
  },
  getExprName(name) {
    name = name.trim()
    return name.substring(2, name.length - 2)
  }
}
export default Compile
