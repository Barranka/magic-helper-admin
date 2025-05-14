<script setup lang="ts">
  import { ref, computed } from 'vue';
  import axios from 'axios';
  import { useStore } from 'vuex';
  import EventModal from '../components/Modals/EventModal.vue';
  import EventCreateButton from '../components/Event/EventCreateButton.vue';
  import EventTable from '../components/Event/EventTable.vue';

  import {
    NFlex,
    NSpace,
    NH3,
    NText,
    NSpin,
    NGradientText,
    useDialog,
  } from 'naive-ui';

  import { useNotify } from '../composables/useNotify';
  import EmptyDefault from '../components/UiCommon/EmptyDefault.vue';

  const dialog = useDialog();
  const store = useStore();
  const { notifySuccess, notifyError } = useNotify();

  const storeEvents = computed(() => store.getters.getAllEventsData);
  const isLoading = computed(() => store.getters.getLoading);

  const events = ref(storeEvents);
  const isModalVisible = ref(false);
  const modalEventType = ref<EventType>();
  const eventId = ref<EventId>();

  const loadEvents = async () => {
    try {
      await store.dispatch('getAllEventsData');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        notifyError(error);
      }
    }
  };

  const openModal = (type: EventType, event: EventItem | null = null) => {
    isModalVisible.value = true;
    modalEventType.value = type;
    eventId.value = event?.id;
  };

  const closeModal = () => {
    isModalVisible.value = false;
    modalEventType.value = undefined;
    eventId.value = undefined;
  };

  const deleteEvent = async (id: number, type: EventType) => {
    try {
      type === 'daily'
        ? await store.dispatch('deleteDailyEvent', id)
        : await store.dispatch('deleteTournamentEvent', id);

      notifySuccess('Событие успешно удалено!');

      loadEvents();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        notifyError(error);
      }
    }
  };

  const сonfirmDeleting = (id: number, event: EventType) => {
    dialog.warning({
      title: 'Удалить событие?',
      positiveText: 'Подтвердить',
      negativeText: 'Отменить',
      draggable: true,
      onPositiveClick: () => {
        deleteEvent(id, event);
      },
    });
  };

  loadEvents();
</script>

<template>
  <n-spin :show="isLoading">
    <n-space
      vertical
      size="large"
    >
      <n-flex justify="space-between">
        <n-h3
          prefix="bar"
          type="success"
        >
          <n-gradient-text
            :size="36"
            type="success"
          >
            MagicHelperAdmin
          </n-gradient-text>
        </n-h3>

        <EventCreateButton @openModal="openModal($event)" />
      </n-flex>

      <n-layout v-if="events.length">
        <n-h3 style="padding-left: 16px">
          <n-text
            type="info"
            :size="36"
          >
            Список событий
          </n-text>
        </n-h3>

        <EventTable :events="events" />
      </n-layout>

      <EmptyDefault v-else />

      <EventModal
        :isVisible="isModalVisible"
        :type="modalEventType"
        :id="eventId"
        @close="closeModal"
        @closeModal="isModalVisible = false"
        @reload="loadEvents()"
      />
    </n-space>
  </n-spin>
</template>
