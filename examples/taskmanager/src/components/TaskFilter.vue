<style>
  a.is-disabled { color: #065; border-bottom: 2px solid #065; }
  .separator { border-top:2px solid #EEE;padding-top:15px; }
</style>

<template>
  <div class="separator">
    <div class="is-pulled-left">
      <em>Total Tasks: <strong>{{taskCount}}</strong></em>
    </div>
    <div class="is-pulled-right">
      <div class="is-pulled-right">
        <a href="#" :class="{ 'is-disabled': isAll }" @click.stop="doFilterAll()">All</a>
        <span>&nbsp;</span>
        <a href="#" :class="{ 'is-disabled': isActive }" @click.stop="doFilterActive()">Active</a>
        <span>&nbsp;</span>
        <a href="#" :class="{ 'is-disabled': isCompleted }" @click.stop="doFilterCompleted()">Completed</a>
        <span v-if="completedCount > 0">
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <a href="#" @click.stop="doClearCompleted()">Clear Completed</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import task from 'store/task'

  const TaskFilter = {
    props: ['tasks', 'filter'],

    computed: {
      taskCount() {
        return this.tasks.length
      },

      completedCount() {
        return this.tasks.reduce((prev, next) => (prev + (next.completed ? 1 : 0)), 0)
      },

      isAll() {
        return this.filter === 'ALL'
      },

      isActive() {
        return this.filter === 'ACTIVE'
      },

      isCompleted() {
        return this.filter === 'COMPLETED'
      }
    },

    methods: {
      doFilterAll() {
        task.filter('ALL')
      },

      doFilterActive() {
        task.filter('ACTIVE')
      },

      doFilterCompleted() {
        task.filter('COMPLETED')
      },

      doClearCompleted() {
        task.clearCompleted()
      }
    }
  }

  export default TaskFilter
</script>
