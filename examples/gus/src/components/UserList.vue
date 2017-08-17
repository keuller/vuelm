
<template>
  <div class="">
    <h4 class="subtitle is-4">User List</h4>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th width="10%">ID</th>
          <th>Login</th>
          <th>Home</th>
          <th width="12%">Score</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="row in users">
          <user-row v-bind:user="row"></user-row>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">Total users found: <strong>{{users.length}}</strong></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
  import UserRow from 'components/UserRow'

  const UserList = {
    name: 'user-list',

    props: ['users'],

    components: {
      UserRow
    }
  }

  export default UserList
</script>
