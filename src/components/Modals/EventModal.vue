<script setup lang="ts">
  import { NModal, useNotification, NButton, NFlex, NDivider } from 'naive-ui';
  import { computed, watch, ref } from 'vue';
  import { useStore } from 'vuex';

  import DailyEventForm from '../Forms/DailyEventForm.vue';
  import TournamentEventForm from '../Forms/TournamentEventForm.vue';

  const notification = useNotification();
  const store = useStore();

  interface Props {
    isVisible: boolean;
    type: EventType | null;
    id: EventId | null;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (event: 'closeModal'): void;
    (event: 'reload'): void;
  }>();

  const formComponentRef = ref();

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
    () => props.id,
    (newId, oldId) => {
      if (newId !== oldId) {
        store.commit('setMode', 'edit');

        if (props.type === 'daily') {
          store.commit(
            'updateDailyEventData',
            storeEvents.value.find((event: EventItem) => event.id === props.id)
          );
        } else {
          store.commit(
            'updateTournamentEventData',
            storeEvents.value.find((event: EventItem) => event.id === props.id)
          );
        }
      }
    }
  );

  const editEvent = async () => {
    try {
      if (props.type === 'daily') {
        await store.dispatch('updateDailyData', formDailyData.value);
      } else {
        await store.dispatch('updateTournamentData', formTournamentData.value);
      }

      notification.success({
        content: 'Событие успешно отредактировано!',
        duration: 2500,
        keepAliveOnHover: true,
      });

      cancelCallback();
      emit('reload');
    } catch (error: any) {
      console.log(error, 'error');
      notification.error({
        content: error.message,
        duration: 2500,
        keepAliveOnHover: true,
      });
    }
  };

  const submitCallback = async () => {
    try {
      const valid = await formComponentRef.value?.validateForm();

      if (!valid) return;

      if (mode.value === 'edit') {
        editEvent();

        return;
      }

      try {
        if (props.type === 'daily') {
          await store.dispatch('createDailyData', formDailyData.value);
        } else {
          await store.dispatch(
            'createTournamentData',
            formTournamentData.value
          );
        }

        notification.success({
          content: 'Событие успешно созданно!',
          duration: 2500,
          keepAliveOnHover: true,
        });

        cancelCallback();
        emit('reload');
      } catch (error: any) {
        notification.error({
          content: error.response,
          meta: error.response,
          duration: 2500,
          keepAliveOnHover: true,
        });
      }
    } catch (error: any) {
      console.log(error.response, 'error');
    }
  };

  const cancelCallback = () => {
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
          @click="cancelCallback()"
          secondary
        >
          Отменить
        </n-button>

        <n-button
          attr-type="submit"
          type="info"
          secondary
          @click="submitCallback"
        >
          Отправить
        </n-button>
      </n-flex>
    </template>
  </n-modal>
</template>
