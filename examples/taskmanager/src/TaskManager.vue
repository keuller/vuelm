
<template>
  <div class="section">
    <app-title text="Task Manager" size="3"></app-title>
    <task-form @addTask="addTask"></task-form>
    <br/><br/>
    <task-list :tasks="list" @complete="completeTask"></task-list>
    <task-filter :tasks="list" :filter="filter" @onFilter="doFilter" @onCompleted="clearCompleted"></task-filter>
    <br/>
  </div>
</template>

<script>
  import { connect } from 'vuelm'
  import task        from 'store/task'
  import AppTitle    from 'components/Title'
  import TaskForm   from 'components/TaskForm'
  import TaskList   from 'components/TaskList'
  import TaskFilter from 'components/TaskFilter'

  const TaskManager = {
    name: 'task-manager',

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

    components: {
      AppTitle, TaskForm, TaskList, TaskFilter
    }
  }

  export default connect(TaskManager, { task })
</script>
