import 'babel-polyfill'
import Vue  from 'vue'
import TaskManager from 'TaskManager'

const app = new Vue({
  el: '#app',
  template: `
    <div>
      <task-manager></task-manager>
    </div>
  `,
  components: { TaskManager }
})
