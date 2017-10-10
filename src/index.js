'use strict'

import connect from './connect'
import Store from './store'
import { createTypes } from './util'

const store = (state, updates, actions) => new Store(state, updates, actions)

const deprecated = (cmd) => () => { console.warn("'%s' is deprecated and will be removed on next version.", cmd) }

export default {
    version: '0.8.3',
    types: createTypes,
    store,
    info: deprecated('info'),
    logger: deprecated('logger'),
    connect
}
