'use strict'

import connect from './connect'
import Store from './store'
import { createTypes } from './util'

const hook = (typeof window !== 'undefined' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__)

const store = (state, updates, actions) => {
    const $model = new Store(state, updates, actions)
    if (hook) { hook.emit('vuex:init', $model) }
    return $model
}

const deprecated = (cmd) => () => { console.warn("'%s' is deprecated and will be removed on next version.", cmd) }

export default {
    version: '0.8.1',
    types: createTypes,
    store,
    info: deprecated('info'),
    logger: deprecated('logger'),
    connect
}
