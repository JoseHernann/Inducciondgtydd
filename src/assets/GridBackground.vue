<script setup lang="ts">

</script>

<template>
<div class="mainContent w-screen">
</div>
</template>

<style scoped>
*{
  transform-style: preserve-3d;
}
.mainContent {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: hsla(0, 0%, 0%, 0);
  color-scheme: light;
}
.mainContent::before {
  --line: hsla(0, 0%, 100%, 0.42);
  --size: 100px;
  content: "";
  height: 100vh;
  width: 100vw;
  position: fixed;
  background:
    linear-gradient(90deg, var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size),
    linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% / var(--size) var(--size);
  mask: linear-gradient(-15deg, transparent 10%, white);
  top: 0;
  transform-style: flat;
  pointer-events: none;
  z-index: -10;
}
</style>