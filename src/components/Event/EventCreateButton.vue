<script setup lang="ts">
import { NButton, NFlex } from 'naive-ui';

const emit = defineEmits<{
  (e: 'openModal'): void;
}>();
</script>

<template>
  <n-flex style="padding: 16px">
    <n-button @click="emit('openModal')" size="medium" type="info" ghost>
      Добавить новое событие
    </n-button>
  </n-flex>
</template>
