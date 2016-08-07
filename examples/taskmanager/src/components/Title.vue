
<template>
  <h1 class="title">{{text}}</h1>
</template>

<script>
  let Title = {
    props: {
      text: { type: String, required: true }
    }
  }

  export default Title
</script>
