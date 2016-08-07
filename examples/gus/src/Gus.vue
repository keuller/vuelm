
<template>
  <div class="section">
    <h3 class="title is-3">Github User Explorer</h3>
    <div class="container">
      <search></search>
      <br/><br/>
      <user-list :users="users"></user-list>
    </div>
  </div>
</template>

<script>
  import { connect } from 'vuelm'
  import Search from 'components/Search'
  import UserList from 'components/UserList'
  import user   from 'model/user'

  const Gus = {
    data() {
      return {
        users: []
      }
    },

    events: {
      ['on-search'](data) {
        user.search(data)
      }
    },

    components: {
      Search, UserList
    }
  }

  export default connect(Gus, { user })
</script>
