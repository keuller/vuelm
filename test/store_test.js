var Vuelm = require('../index')
var test = require('tape')

Vuelm.info()

var Type = Vuelm.types('INCREMENT', 'DECREMENT')

var state = {
  count: 0
}

var Updates = {
  [Type.INCREMENT]: function(state) {
    state.count = state.count + 1
    return state
  },

  [Type.DECREMENT]: function(state) {
    state.count = state.count - 1
    return state
  }
}

var Actions = {
  increment: function() {
    this.update(Type.INCREMENT)
  },
  decrement: function() {
    this.update(Type.DECREMENT)
  }
}

test('create model', function(t) {
  t.plan(2)

  var Counter = Vuelm.store(state, Updates, Actions)

  t.notEqual(Counter, null)
  t.deepEqual(Counter.state(), { count: 0 })
})

test('get property from state', function(t) {
  t.plan(1)

  var Counter = Vuelm.store(state, Updates, Actions)

  t.equal(Counter.get('count'), 0)
})

test('Update state', function(t) {
  t.plan(3)

  var Counter = Vuelm.store(state, Updates, Actions)
  t.equal(Counter.get('count'), 0, 'count starts 0')

  Counter.increment()
  t.equal(Counter.get('count'), 1, 'count incremented 1')

  Counter.decrement()
  t.equal(Counter.get('count'), 0, 'count decremented 0')
})

test('Observer mutations', function(t) {
  t.plan(1)

  var Counter = Vuelm.store(state, Updates, Actions)
  var dispose = Counter.observe(function(state) {
    t.deepEqual(state, { count: 1 })
  })

  Counter.increment()
  dispose()
})
