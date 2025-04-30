<script setup lang="ts">
  import { NModal } from 'naive-ui';
  import { computed } from 'vue';

  import DailyEventForm from '../Forms/DailyEventForm.vue';
  import TournamentEventForm from '../Forms/TournamentEventForm.vue';

  interface Props {
    isVisible: boolean;
    formType: 'daily' | 'tournament';
    formData: Record<string, any>; // уточнить тип
  }

  const props = defineProps<Props>();

  const showModal = computed(() => props.isVisible);
  const submitCallback = () => console.log('submitCallback');
  const cancelCallback = () => console.log('cancelCallback');

  const componentName = computed(() => {
    switch (props.formType) {
      case 'daily':
        return 'DailyEventForm';
      case 'tournament':
        return 'TournamentEventForm';
      default:
        return undefined;
    }
  });

  const componentTitle = computed(() => {
    switch (props.formType) {
      case 'daily':
        return 'Создать дейлик';
      case 'tournament':
        return 'Создать турнир';
      default:
        return undefined;
    }
  });
</script>

<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    positive-text="Сохранить"
    negative-text="Отмена"
    @positive-click="submitCallback"
    @negative-click="cancelCallback"
  >
    <template #header>
      <p>{{ componentTitle }}</p>
    </template>

    <div>
      <component :is="componentName" />
    </div>

    <template #action>
      <slot name="action"></slot>
    </template>
  </n-modal>
</template>
