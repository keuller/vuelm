<style>
  .finished { color: crimson; text-decoration: line-through; }
  tbody tr:nth-child(even) { background-color: #EFEFEF; }
  .table td { vertical-align:middle; }
</style>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Task</th>
        <th width="5%">&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="tasks.length < 1">
        <td colspan="2" class="has-text-centered">
          <br/>
          <h5 class="subtitle is-5">No task found!</h5>
        </td>
      </tr>
      <template v-for="task of tasks">
        <task-item :task="task" @completeTask="doCompleteTask"></task-item>
      </template>
    </tbody>
  </table>
</template>

<script>
  import TaskItem from 'components/TaskItem'

  const TaskList = {
    name: 'task-list',

    props: {
      tasks: { type: Array }
    },

    components: {
      TaskItem
    },

    methods: {
      doCompleteTask(item) {
        this.$emit('complete', item)
      }
    }
  }

  export default TaskList
</script>
