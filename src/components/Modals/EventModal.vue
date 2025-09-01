<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :title="componentTitle"
    :bordered="false"
    style="width: 600px"
  >
    <n-divider v-if="componentName" style="margin-top: 0" />

    <slot />

    <n-divider />

    <component ref="formComponentRef" :is="componentName" />

    <n-divider v-if="componentName" style="margin-bottom: 0" />

    <template #footer>
      <n-flex justify="end">
        <n-button @click="closeModal()" secondary> Отменить </n-button>

        <n-button attr-type="submit" type="info" secondary @click="validateForm()">
          Отправить
        </n-button>
      </n-flex>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { useNotify } from '../../composables/useNotify';
import { NModal, NButton, NFlex, NDivider } from 'naive-ui';
import { computed, watch, ref } from 'vue';
import { useStore } from 'vuex';
import { EventType, EventMode } from '../../types/events';

import DailyEventForm from '../Forms/DailyEventForm.vue';
import TournamentEventForm from '../Forms/TournamentEventForm.vue';

interface Props {
  isVisible: boolean;
  type?: EventType;
  mode: EventMode;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: 'closeByCancel'): void;
  (event: 'reload'): void;
}>();

const formComponentRef = ref();
const currentType = ref();

const { notifySuccess, notifyError } = useNotify();
const store = useStore();

const showModal = computed(() => props.isVisible);
const formDailyData = computed(() => store.getters.getEventDataDefault);

const mode = computed(() => store.getters.getMode);
const modeLabel = computed(() => {
  return mode.value === 'edit' ? 'Редактировать' : 'Создать';
});

const componentName = computed(() => {
  switch (currentType.value) {
    case 'EVENT_TYPE_DAILY':
      return DailyEventForm;
    case 'EVENT_TYPE_TOURNAMENT':
      return TournamentEventForm;
    default:
      return undefined;
  }
});

const componentTitle = computed(() => {
  return `${modeLabel.value} событие`;
});

watch(
  () => props.type,
  (newValue) => {
    currentType.value = newValue;
  },
);

const editEvent = async () => {
  try {
    await store.dispatch('updateEventData', formDailyData.value);

    notifySuccess('Событие успешно отредактировано!');

    closeModal();
    emit('reload');
  } catch (error: any) {
    notifyError(error);
  }
};

const submitCallback = async () => {
  try {
    await store.dispatch('createEventData', formDailyData.value);

    notifySuccess('Событие успешно отредактировано!');

    closeModal();
    emit('reload');
  } catch (error: any) {
    notifyError(error);
  }
};

const validateForm = async () => {
  try {
    const valid = await formComponentRef.value?.validateForm();

    if (!valid) return;

    if (mode.value === 'edit') {
      editEvent();

      return;
    }

    submitCallback();
  } catch (error: any) {
    notifyError(error);
  } finally {
    formComponentRef.value = null;
  }
};

const closeModal = () => {
  emit('closeByCancel');
  store.dispatch('clearEvent');
};
</script>
