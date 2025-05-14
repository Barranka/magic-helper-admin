<script setup lang="ts">
  import { NButton, NFlex } from 'naive-ui';

  const emit = defineEmits<{
    (e: 'openModal', type: EventType): void;
  }>();
</script>

<template>
  <n-flex style="padding: 16px">
    <n-button
      @click="emit('openModal', 'daily')"
      size="medium"
      type="info"
    >
      ➕ Дейлик
    </n-button>
    <n-button
      @click="emit('openModal', 'tournament')"
      size="medium"
      type="info"
    >
      ➕ Турнир
    </n-button>
  </n-flex>
</template>
