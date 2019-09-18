export default {
  // 判断当前传入的el是否为Node节点
  isElementNode(node) {
    return node.nodeType === 1
  },
  // 判断当前传的数据是否包含v-开头的自定义指定
  isDirective(name) {
    return name.includes('v-')
  }
}