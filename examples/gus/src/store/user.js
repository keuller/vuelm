import { store, types } from 'vuelm'
import axios from 'axios'

const Type = types('GET_USERS', 'CLEAR_USERS')
const baseUrl = 'https://api.github.com'

const state = {
  users: []
}

const updates = {
  [Type.CLEAR_USERS](state) {
    state.users = []
    return {...state}
  },

  [Type.GET_USERS](state, list) {
    state.users = [...list]
    return state
  }
}

const actions = {
  clear() {
    this.update(Type.CLEAR_USERS)
  },

  search(obj) {
    let params = `?q=${obj.text}`
    axios.get(`${baseUrl}/search/users${params}`).then(result => {
      this.update(Type.GET_USERS, result.data.items)
    }).catch(err => {
      console.error(err)
    })
  }
}

export default store(state, updates, actions)
