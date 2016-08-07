
<template>
  <div class="section">
    <title text="Task Manager" size="3"></title>
    <task-form></task-form>
    <br/><br/>
    <task-list :tasks="list"></task-list>
    <task-filter :tasks="list" :filter="filter"></task-filter>
    <br/>
  </div>
</template>

<script>
  import { connect } from 'vuelm'
  import task        from 'model/task'

  import Title      from 'components/Title'
  import TaskForm   from 'components/TaskForm'
  import TaskList   from 'components/TaskList'
  import TaskFilter from 'components/TaskFilter'

  const TaskManager = {
    data() {
      return {
        tasks:[],
        filter:'ALL'
      }
    },

    computed: {
      list() {
        switch(this.filter) {
          case 'ACTIVE': return this.tasks.filter(task => !task.completed)
          case 'COMPLETED': return this.tasks.filter(task => task.completed)
          default: return this.tasks
        }
      }
    },

    events: {
      onAddTask(model) {
        task.addTask(model)
      },

      onCompleteTask(model) {
        task.completeTask(model)
      }
    },

    components: {
      Title, TaskForm, TaskList, TaskFilter
    }
  }

  export default connect(TaskManager, { task })
</script>
