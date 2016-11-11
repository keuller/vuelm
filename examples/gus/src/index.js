import 'babel-polyfill'
import Vue from 'vue'
import Guex from 'Guex'

const app = new Vue({
  render: (h) => h(Guex)
})

app.$mount('#app')
