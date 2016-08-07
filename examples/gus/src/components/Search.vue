
<template>
  <div>
    <label>Github User:</label>
    <input type="text" class="input" @keydown.enter="doSearch()" v-model="text" />
    <button class="button is-primary" @click.prevent="doSearch()">Search</button>
  </div>
</template>

<script>
  const Search = {
    data() {
      return { text:'' }
    },

    methods: {
      doSearch() {
        this.$dispatch("on-search", { text: this.text })
      }
    }
  }

  export default Search
</script>
