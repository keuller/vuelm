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
        <a href="#" :class="{ 'is-disabled': isAll }" @click.stop="doFilter('ALL')">All</a>
        <span>&nbsp;</span>
        <a href="#" :class="{ 'is-disabled': isActive }" @click.stop="doFilter('ACTIVE')">Active</a>
        <span>&nbsp;</span>
        <a href="#" :class="{ 'is-disabled': isCompleted }" @click.stop="doFilter('COMPLETED')">Completed</a>
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
  const TaskFilter = {
    name: 'task-filter',

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
      doFilter(type) {
        this.$emit('onFilter', type)
      },

      doClearCompleted() {
        this.$emit('onCompleted')
      }
    }
  }

  export default TaskFilter
</script>
