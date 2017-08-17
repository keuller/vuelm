
<template>
  <tr>
    <td>{{user.id}}</td>
    <td>{{user.login}}</td>
    <td>{{user.html_url}}</td>
    <td>{{user.score}}</td>
  </tr>
</template>

<script>
  const UserRow = {
    name: 'user-row',
    
    props: ['user']
  }

  export default UserRow
</script>
