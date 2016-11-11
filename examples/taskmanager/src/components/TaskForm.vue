
<template>
  <div>
    <label>Description</label>
    <input type="text" class="input" maxlength="45" @keyup.enter="doAddTask()" v-model="text" />
    <button class="button is-success" @click.prevent="doAddTask()">Add Task</button>
  </div>
</template>

<script>
  let TaskForm = {
    data() {
      return { text: '' }
    },

    methods: {
      doAddTask() {
        if (this.text === '') return
        this.$emit('addTask', { text: this.text, completed: false })
        this.text = ''
      }
    }
  }

  export default TaskForm
</script>
