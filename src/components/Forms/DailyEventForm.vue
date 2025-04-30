<template>
  <form @submit.prevent="handleSubmit">
    <!-- поля -->
  </form>
</template>

<script setup lang="ts">
defineProps({
  mode: { type: String, default: 'create' },
  initialData: Object
})

const handleSubmit = () => {};
</script>
