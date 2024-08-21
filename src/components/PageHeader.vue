<!-- PageHeader.vue -->
<template>
    <header>
        <div id="nav">
            <RouterLink to="/">Home</RouterLink> |
            <RouterLink to="/about">About</RouterLink> |
            <RouterLink :to="{name: postList}">게시판</RouterLink>
        </div>
    </header>
    <hr/>
</template>
  
<script setup>

</script>
  
<style scoped>
  
</style>