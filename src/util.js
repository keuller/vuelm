export function deepProp(obj, path) {
    return path.split('.').reduce(function(o, p) { return o[p] }, obj)
}

export function deepCopy(target, source) {
    for(let prop in source) {
        let _val = null
        if (Array.isArray(source[prop])) {
            _val = []
            source[prop].forEach(function(item) { _val.push(deepCopy({}, item)) })
        } else if (typeof source[prop] === 'object') {
            _val = deepCopy({}, source[prop])
        } else {
            _val = source[prop]
        }
        target[prop] = _val
    }
    return target
}

export function createTypes() {
    let result = {}
    if (!arguments) return result
    let len = arguments.length
    for(let idx=0; idx < len; idx++) {
      result[arguments[idx]] = arguments[idx].toUpperCase()
    }
    return result
}

export function assign_actions(component, store) {
    let cmethods = component.methods || {}
      , cname = component.name || 'unknown'
      , def_funcs = ['get', 'update', 'observe', '_notify']
      , ctype = null

    let isDefaultFunc = (name) => {
        const has = def_funcs.filter((item) => item == name)
        return (has.length > 0)
    }

    for(let key in store) {
        ctype = (typeof store[key])
        if (ctype == 'function' && !isDefaultFunc(key)) {
            if (cmethods.hasOwnProperty(key)) {
                console.warn("Component '%s' already have a method called '%s'", cname, key)
            } else {
                cmethods[key] = store[key].bind(store)
            }
        }
    }

    cmethods.sync = function(obj) {
      const data = JSON.parse(JSON.stringify(obj))
      this.update('SYNC_MODEL', data);
    }.bind(store)

    component.methods = cmethods
}
