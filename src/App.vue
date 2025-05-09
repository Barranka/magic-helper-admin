<script setup lang="ts">
  import { NNotificationProvider, NDialogProvider } from 'naive-ui';
</script>

<template>
  <n-notification-provider>
    <n-dialog-provider>
      <RouterView></RouterView>
    </n-dialog-provider>
  </n-notification-provider>
</template>
