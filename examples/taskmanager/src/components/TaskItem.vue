
<template>
  <tr>
    <td><span :class="classes()">{{task.text}}</span></td>
    <td>
      <a href="#" v-if="!task.completed" class="button is-primary is-outlined" @click.prevent="doComplete(task)">
        <span class="icon">
          <i class="fa fa-check"></i>
        </span>
        <span>Complete</span>
      </a>
    </td>
  </tr>
</template>

<script>
  const TaskItem = {
    props: ['task'],

    methods: {
      classes() {
        return { 'finished': this.task.completed }
      },

      doComplete(record) {
        this.$dispatch('onCompleteTask', record)
      }
    }
  }

  export default TaskItem
</script>
