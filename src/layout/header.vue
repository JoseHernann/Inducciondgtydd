<script setup lang="ts">
import logo from '../assets/logoUANL.vue';
import {BellAlertIcon} from "@heroicons/vue/24/outline";

</script>
<template>
  <nav class="flex justify-between items-center fixed bg-white w-screen left-0 top-0 px-5 pt-2 boxShadow ">
    <div>
      <logo class="w-32 mb-2" />
    </div>
    <BellAlertIcon class="w-6 h-6"/>
  </nav>
</template>

<style scoped>
.boxShadow {
 box-shadow: 0px 4px 25px 0px rgba(184, 181, 181, 0.25);
}
</style>
