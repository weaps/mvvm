class Dep {
  constructor() {
    this.subs = []
  }
  add(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.map(watcher => watcher.updater())
  }
}
