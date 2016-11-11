import 'babel-polyfill'
import Vue  from 'vue'
import Vuelm from 'vuelm'
import TaskManager from 'TaskManager'

const app = new Vue({
  render: (h) => h(TaskManager)
})

app.$mount('#app')
