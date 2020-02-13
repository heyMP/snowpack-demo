import {
  observable,
  decorate,
  computed,
  action,
  autorun
} from "../web_modules/mobx.js";

class Store {
  constructor() {
    this.count = 0
  }

  incrementCount() {
    if (this.count < 10) {
      this.count++
    }
  }
  decrementCount() {
    if (this.count > 0) {
      this.count = --this.count
    }
  }

  get complete() {
    // return true
    return (this.count > 9)
  }
}

decorate(Store, {
  count: observable,
  decrementCount: action,
  incrementCount: action,
  complete: computed
})

export const store = new Store()