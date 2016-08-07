import 'babel-polyfill'
import Vue from 'vue'
import Gus from 'Gus'

const app = new Vue({
  el: '#app',
  template: `
    <div>
      <gus></gus>
    </div>
  `,
  components: { Gus }
})
