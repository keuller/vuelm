
<template>
  <div class="section">
    <h3 class="title is-3">GitHub User Explorer</h3>
    <div class="container">
      <search @filter="doSearch"></search>
      <br/><br/>
      <user-list :users="users"></user-list>
    </div>
  </div>
</template>

<script>
  import { connect } from 'vuelm'
  import Search from 'components/Search'
  import UserList from 'components/UserList'
  import user   from 'store/user'

  const Guex = {
    name: 'guex',

    data() {
      return {
        users: []
      }
    },

    methods: {
      doSearch(data) {
        user.search(data)
      }
    },

    components: {
      Search, UserList
    }
  }

  export default connect(Guex, { user })
</script>
