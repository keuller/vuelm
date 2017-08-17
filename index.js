;(function(exports) {
  'use strict'

  var runtime = {
    VERSION: '0.7.0',
    IS_DEBUG: false,
    IS_LOGGER: false
  }

  var hook = (typeof window !== 'undefined' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__)

  var deepProp = function(obj, path) {
    return path.split('.').reduce(function(o, p) { return o[p] }, obj)
  }

  var deepCopy = function deepCopy(target, source) {
    for(var prop in source) {
      var _val = null
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

  var _info = function() {
    console.log('Vuelm version....:', runtime.VERSION)
    console.log('Vuelm debug mode.:', runtime.IS_DEBUG)
    console.log('Vuelm logger mode:', runtime.IS_LOGGER)
  }

  var _enableDebug = function(flag) {
    runtime.IS_DEBUG = flag
    Vue.config.debug = flag
    Vue.config.devtools = flag
  }

  var _enableLog = function(flag) {
    runtime.IS_LOGGER = flag
  }

  var Store = function(state, updates, actions) {
    this._options = {
      state: state,
      updates: updates
    }

    this._subscriber_id = 100
    this._subscribers = {}

    if (actions !== undefined || actions !== null) {
      for (var key in actions) {
        this[key] = actions[key]
      }
    }
  }

  Store.prototype = {
    _notify: function() {
      var $state = deepCopy(this._options.state)
      for(var id in this._subscribers) {
        this._subscribers[id]($state)
      }
      $state = null
    },

    state: function() {
      return deepCopy({}, this._options.state)
    },

    get: function(prop) {
      return deepProp(this._options.state, prop)
    },

    update: function(type, data) {
      var prop = null
        , state = {}
        , prev = deepCopy(this._options.state)
        , next = {}

      if (runtime.IS_LOGGER && console.group) console.group(type)
      if (runtime.IS_LOGGER) console.log('Old State:', prev)

      if (typeof this._options.updates[type] === 'function') {
        next = this._options.updates[type].call(this, prev, data)
        this._options.state = next
      } else {
        next = prev
      }

      if (runtime.IS_DEBUG && hook) { hook.emit('vuex:mutation', { type: type, payload: data || {} }, next) }
      if (runtime.IS_LOGGER) console.log('New State:', next)
      if (runtime.IS_LOGGER && console.groupEnd) console.groupEnd()
      this._notify()
      prev = null; next = null
    },

    observe: function(fn) {
      var self = this, $sid = this._subscriber_id++
      self._subscribers[$sid] = function(state) {
        fn.call(self, state)
      }
      return function() {
        var _sid = $sid
        delete self._subscribers[_sid]
      }
    }
  }

  var _model = function model(state, updates, actions) {
    console.warn('\'model\' method is deprecated and will be removed. Instead use \'store\' function to create your stores.')
    var $model = new Store(state, updates, actions)
    if (hook) { hook.emit('vuex:init', this) }
    return $model
  };

  var _store = function store(state, updates, actions) {
    var $model = new Store(state, updates, actions)
    if (hook) { hook.emit('vuex:init', this) }
    return $model
  };

  var assign_actions = function assign_actions(component, store) {
    var cmethods = component.methods || {}
      , cname = component.name || 'unknown'
      , def_funcs = ['state', 'get', 'update', 'observe', '_notify']
      , ctype = null

    var isDefaultFunc = function(name) {
      var has = def_funcs.filter(function(item) { return item == name })
      return (has.length > 0)
    };

    for(var key in store) {
      ctype = (typeof store[key])
      if (ctype == 'function' && !isDefaultFunc(key)) {
        if (cmethods.hasOwnProperty(key)) {
          console.warn("Component '%s' already have a method called '%s'", cname, key)
        } else {
          cmethods[key] = store[key].bind(store)
        }
      }
    }

    component.methods = cmethods
  };

  var _connect = function connect(component, store) {
    var _bcreate = component.beforeCreate
      , _bdestroy = component.beforeDestroy
      , _bmount = component.beforeMount

    if (typeof store !== 'object') {
      console.warn('\"store\" object must be defined.')
      return
    }

    // inject store action into component
    for (var key in store) {
      assign_actions(component, store[key])
    }

    component.beforeCreate = function() {
      var _disposes = []

      var watcher = function(newState) {
        for(var prop in newState) {
          if (this.hasOwnProperty(prop)) {
            this.$set(this, prop, deepProp(newState, prop))
          }
        }
      }.bind(this)

      for (var key in store) {
        _disposes.push(store[key].observe(watcher))
      }

      if (_bcreate !== undefined) _bcreate.call(component)
      component.$disposes = _disposes
    }

    component.beforeDestroy = function() {
      if (_bdestroy !== undefined) _bdestroy()
      component.$disposes.forEach(function(dispose) { dispose() })
      component.$disposes = null
    }

    component.beforeMount = function() {
      // initialize component with current state's store
      for (var key in store) {
        var tmp = store[key].state()
        for (var prop in tmp) {
            if (this.hasOwnProperty(prop)) {
              this.$set(this, prop, deepProp(tmp, prop))
            }
        }
      }
      if (_bmount != undefined) _bmount()
    }

    return component
  };

  var _createTypes = function() {
    var result = {}
    if (!arguments) return result
    var len = arguments.length
    for(var idx=0; idx < len; idx++) {
      result[arguments[idx]] = arguments[idx].toUpperCase()
    }
    return result
  }

  exports.info = _info
  exports.types = _createTypes
  exports.version = runtime.VERSION
  exports.isDebug = runtime.IS_DEBUG
  exports.logger = _enableLog
  exports.debug = _enableDebug
  exports.store = _store
  exports.connect = _connect
})(typeof exports === 'undefined' ? (this.Vuelm = {}) : exports)