<script setup lang="ts">
  import { useEventType } from '../../composables/useEventType';
  import { useNotify } from '../../composables/useNotify';
  import { NModal, NButton, NFlex, NDivider } from 'naive-ui';
  import { computed, watch, ref } from 'vue';
  import { useStore } from 'vuex';

  import DailyEventForm from '../Forms/DailyEventForm.vue';
  import TournamentEventForm from '../Forms/TournamentEventForm.vue';

  interface Props {
    isVisible: boolean;
    type?: EventType;
    id?: EventId;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (event: 'closeModal'): void;
    (event: 'reload'): void;
  }>();

  const formComponentRef = ref();
  const currentType = ref();

  const { isDailyEvent } = useEventType(currentType);
  const { notifySuccess, notifyError } = useNotify();
  const store = useStore();

  const storeEvents = computed(() => store.getters.getAllEventsData);
  const showModal = computed(() => props.isVisible);
  const formDailyData = computed(() => store.getters.getDailyEventData);
  const formTournamentData = computed(() => {
    return store.getters.getTournamentEventData;
  });
  const mode = computed(() => store.getters.getMode);
  const modeLabel = computed(() => {
    return mode.value === 'edit' ? 'Редактировать' : 'Создать';
  });

  const componentName = computed(() => {
    switch (props.type) {
      case 'daily':
        return DailyEventForm;
      case 'tournament':
        return TournamentEventForm;
      default:
        return undefined;
    }
  });

  const componentTitle = computed(() => {
    switch (props.type) {
      case 'daily':
        return `${modeLabel.value} дейлик`;
      case 'tournament':
        return `${modeLabel.value} турнир`;
      default:
        return undefined;
    }
  });

  watch(
    () => props.type,
    (newValue) => {
      currentType.value = newValue;
    }
  );

  watch(
    () => props.id,
    (newId, oldId) => {
      if (newId !== oldId) {
        store.commit('setMode', 'edit');

        store.commit(
          isDailyEvent.value
            ? 'updateDailyEventData'
            : 'updateTournamentEventData',
          storeEvents.value.find((event: EventItem) => event.id === props.id)
        );
      }
    }
  );

  const editEvent = async () => {
    try {
      if (isDailyEvent.value) {
        await store.dispatch('updateDailyData', formDailyData.value);
      } else {
        await store.dispatch('updateTournamentData', formTournamentData.value);
      }

      notifySuccess('Событие успешно отредактировано!');

      closeModal();
      emit('reload');
    } catch (error: any) {
      notifyError(error);
    }
  };

  const submitCallback = async () => {
    try {
      if (isDailyEvent.value) {
        await store.dispatch('createDailyData', formDailyData.value);
      } else {
        await store.dispatch('createTournamentData', formTournamentData.value);
      }

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
    }
  };

  const closeModal = () => {
    store.dispatch('clearDailyEventData');
    store.dispatch('clearTournamentEventData');
    emit('closeModal');
  };
</script>

<template>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :title="componentTitle"
    :bordered="false"
    style="width: 600px"
  >
    <n-divider style="margin-top: 0" />

    <component
      ref="formComponentRef"
      :is="componentName"
    />

    <n-divider style="margin-bottom: 0" />

    <template #footer>
      <n-flex justify="end">
        <n-button
          @click="closeModal()"
          secondary
        >
          Отменить
        </n-button>

        <n-button
          attr-type="submit"
          type="info"
          secondary
          @click="validateForm()"
        >
          Отправить
        </n-button>
      </n-flex>
    </template>
  </n-modal>
</template>
