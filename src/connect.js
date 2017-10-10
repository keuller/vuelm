import { assign_actions, deepProp } from './util.js'

export default function connect(component, store) {
    let _bcreate = component.beforeCreate
      , _bdestroy = component.beforeDestroy
      , _bmount = component.beforeMount

    if (typeof store !== 'object') {
        console.warn('\"store\" object must be defined.')
        return
    }

    // inject store action into component
    for (let key in store) {
        assign_actions(component, store[key])
    }

    component.beforeCreate = function() {
        let _disposes = []

        let watcher = (newState) => {
            for(let prop in newState) {
                if (this.hasOwnProperty(prop)) {
                    this.$set(this, prop, deepProp(newState, prop))
                }
            }
        }

        for (var key in store) {
            _disposes.push(store[key].observe(watcher))
        }

        if (_bcreate !== undefined) _bcreate.call(component)
        component.$disposes = _disposes
    }

    component.beforeDestroy = function() {
        if (_bdestroy !== undefined) _bdestroy()
        component.$disposes.forEach(dispose => dispose())
        component.$disposes = null
    }

    component.beforeMount = function() {
      // initialize component with current state's store
      for (let key in store) {
        let tmp = store[key].state()
            for (let prop in tmp) {
                if (this.hasOwnProperty(prop)) {
                    this.$set(this, prop, deepProp(tmp, prop))
                }
            }
        }
        if (_bmount != undefined) _bmount()
    }

    return component
}