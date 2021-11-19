<template>
  <li class="nav-item">
    <router-link class="nav-link" active-class="active" aria-current="page" :to="props.link">
      {{ props.text }}
    </router-link>
  </li>
</template>

<script setup lang="ts">
const props = defineProps({
  text: String,
  link: String,
  active: Boolean,
})
</script>
