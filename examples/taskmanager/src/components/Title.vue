
<template>
  <h1 class="title">{{text}}</h1>
</template>

<script>
  let AppTitle = {
    name: 'app-title',
    
    props: {
      text: { type: String, required: true }
    }
  }

  export default AppTitle
</script>
