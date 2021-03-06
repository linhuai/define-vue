const data = {
  price: 5,
  quantity: 2
}

let target = null
class Dep {
  constructor () {
    this.subscribers = []
  }
  depend () {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target)
    }
  }
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

Object.keys(data).forEach(key => {
  let internalValue = data[key]
  const dep = new Dep()
  Object.defineProperty(data, key, {
    get () {
      console.log(`getting ${key} : ${internalValue}`)
      dep.depend()
      return internalValue
    },
    set (newVal) {
      console.log(`setting ${key} : ${newVal}`)
      internalValue = newVal
      dep.notify()
    }
  })
})

function watcher (myFunc) {
  target = myFunc
  target()
  target = null
}

watcher(() => {
  data.total = data.price * data.quantity
})