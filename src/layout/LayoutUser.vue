<script setup lang="ts">

import HeaderUser from "./headerUser.vue";
</script>

<template>
  <div class="flex flex-col">
    <HeaderUser/>
    <RouterView class="w-full h-full mt-3"/>
  </div>
</template>

<style scoped>

</style>