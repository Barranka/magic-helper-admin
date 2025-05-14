<script setup lang="ts">
  import { NEmpty } from 'naive-ui';

  const emptyText =
    'Нет доступных событий. Чтобы добавить новое, нажмите кнопку «Добавить дейлик» или «Добавить турнир».';
</script>

<template>
  <n-empty
    status="info"
    style="margin-top: 36px"
  >
    {{ emptyText }}
    <slot></slot>
  </n-empty>
</template>
