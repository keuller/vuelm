var Type = Vuelm.types('INCREMENT', 'DECREMENT')

var state = {
  count: 0
}

var updates = {
  [Type.INCREMENT]: function(state) {
    state.count = state.count + 1
    return state
  },

  [Type.DECREMENT]: function(state) {
    state.count = state.count - 1
    return state
  }
}

var actions = {
  increment: function() {
    this.update(Type.INCREMENT)
  },
  decrement: function() {
    this.update(Type.DECREMENT)
  }
}

var Counter = Vuelm.model(state, updates, actions)
