
<template>
  <div>
    <label>Github User:</label>
    <input type="text" class="input" @keydown.enter="doSearch()" v-model="text" />
    <button class="button is-primary" @click.prevent="doSearch()">Search</button>
    <button class="button" @click.prevent="doClear()">Clear</button>
  </div>
</template>

<script>
  const Search = {
    data() {
      return { text:'' }
    },

    methods: {
      doSearch() {
        this.$emit("filter", { text: this.text })
      },
      doClear() {
        this.$emit('clear')
      }
    }
  }

  export default Search
</script>
