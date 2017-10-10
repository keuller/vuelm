import { deepCopy, deepProp } from './util'

function Store(state, updates, actions) {
    updates.SYNC_MODEL = (state, data) => deepCopy(state, data)

    this._subscriber_id = 100
    this._subscribers = {}
    this.logger = false
    this._options = {
        state,
        updates
    }

    if (actions !== undefined || actions !== null) {
        for (let key in actions) {
            this[key] = actions[key]
        }
    }
}

Store.prototype = {
    _notify() {
        let $state = deepCopy({}, this._options.state)
        for(let id in this._subscribers) {
            this._subscribers[id]($state)
        }
        $state = null
    },

    state() {
        return deepCopy({}, this._options.state)
    },

    get(prop) {
        return deepProp(this._options.state, prop)
    },

    update(type, data) {
        let prop = null
        , state = {}
        , prev = deepCopy({}, this._options.state)
        , next = {}

        if (this.logger && console.group) console.group(type)
        if (this.logger) console.log('Old State:', prev)

        if (typeof this._options.updates[type] === 'function') {
            next = this._options.updates[type].call(this, prev, data)
            this._options.state = next
        } else {
            next = prev
        }

        if (this.logger) console.log('New State:', next)
        if (this.logger && console.groupEnd) console.groupEnd()
        this._notify()
        prev = null; next = null
    },

    observe(fn) {
        let self = this, $sid = this._subscriber_id++
        self._subscribers[$sid] = function(state) {
            fn.call(self, state)
        }
        return function() {
            const _sid = $sid
            delete self._subscribers[_sid]
        }
    }
}

export default Store
