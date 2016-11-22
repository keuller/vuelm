import { store, types } from 'vuelm'

const Type = types(
  'ADD_TASK', 'END_TASK', 'CLEAR_COMPLETED', 'FILTER_TASK'
)

const state = {
  tasks: [],
  filter: 'ALL'
}

const updates = {
  [Type.ADD_TASK](state, data) {
    state.tasks = [...state.tasks, data]
    return state
  },

  [Type.END_TASK](state, task) {
    let idx = state.tasks.findIndex(item => item.text === task.text)
    state.tasks[idx].completed = !state.tasks[idx].completed
    return state
  },

  [Type.CLEAR_COMPLETED](state) {
    state.tasks = state.tasks.filter(task => !task.completed)
    state.filter = 'ALL'
    return state
  },

  [Type.FILTER_TASK](state, filter) {
    state.filter = filter
    return state
  }
}

// actions that will update the state
const actions = {
  addTask(task) {
    this.update(Type.ADD_TASK, task)
  },

  completeTask(task) {
    this.update(Type.END_TASK, task)
  },

  filter(type) {
    this.update(Type.FILTER_TASK, type)
  },

  clearCompleted() {
    this.update(Type.CLEAR_COMPLETED)
  }
}

export default store(state, updates, actions)
