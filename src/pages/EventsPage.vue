<template>
  <n-spin :show="isLoading">
    <n-space vertical size="large">
      <n-flex justify="space-between">
        <n-h3 prefix="bar" type="success">
          <n-gradient-text :size="36" type="success"> MagicHelperAdmin </n-gradient-text>
        </n-h3>

        <EventCreateButton @openModal="openModal()" />
      </n-flex>

      <n-layout v-if="true">
        <n-card title="Фильтрация">
          <n-flex justify="space-between">
            <n-select
              v-model:value="filterType"
              :options="optionsType"
              placeholder="Тип"
              clearable
            />

            <n-select
              v-model:value="filterCity"
              :options="optionsCities"
              filterable
              placeholder="Город события"
              clearable
            />
          </n-flex>
        </n-card>

        <n-card title="Список событий">
          <EventTable
            :events="events"
            :cities="storeCities"
            @edit="openModalEdit($event)"
            @delete="сonfirmDeleting($event)"
          />
          <template #footer>
            <n-pagination
              v-model:page="page"
              v-model:page-size="pageSize"
              :page-count="pageCount"
              show-size-picker
              :page-sizes="pageSizes"
            />
          </template>
        </n-card>
      </n-layout>

      <EventModal
        :isVisible="isModalVisible"
        :id="eventId"
        :type="creatingType"
        :mode="storeMode"
        @close="closeModal()"
        @closeByCancel="closeModal()"
        @reload="loadEvents()"
      >
        <n-select
          v-model:value="creatingType"
          :options="optionsType"
          placeholder="Выбери тип события"
          :disabled="storeMode === 'edit'"
          clearable
        />
      </EventModal>
    </n-space>
  </n-spin>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import EventModal from '../components/Modals/EventModal.vue';
import EventCreateButton from '../components/Event/EventCreateButton.vue';
import EventTable from '../components/Event/EventTable.vue';
import { EventItem } from '../types/events';

import {
  NFlex,
  NSpace,
  NSelect,
  NH3,
  NSpin,
  NGradientText,
  useDialog,
  NPagination,
  NCard,
} from 'naive-ui';

import { useNotify } from '../composables/useNotify';

const dialog = useDialog();
const store = useStore();
const { notifySuccess, notifyError } = useNotify();

const storeEvents = computed(() => store.getters.getAllEventsData);
const storeMode = computed(() => store.getters.getMode);
const storeCities = computed(() => store.getters['cities/cities']);
const isLoading = computed(() => store.getters.getLoading);
const pageCount = computed(() => Math.ceil(events.value.length / pageSize.value));
const optionsCities = computed(() =>
  storeCities.value.map((city: City) => ({ label: city.name, value: city.id })),
);

const pageSizes = [
  {
    label: '10 per page',
    value: 10,
  },
  {
    label: '20 per page',
    value: 20,
  },
  {
    label: '30 per page',
    value: 30,
  },
  {
    label: '40 per page',
    value: 40,
  },
  {
    label: '200 per page',
    value: 200,
  },
];
const optionsType = [
  {
    label: 'Дейлик',
    value: 'EVENT_TYPE_DAILY',
  },
  {
    label: 'Турнир',
    value: 'EVENT_TYPE_TOURNAMENT',
  },
];

const events = ref(storeEvents);
const isModalVisible = ref(false);
const eventId = ref();
const page = ref(0);
const pageSize = ref(200);
const filterType = ref();
const filterCity = ref();
const creatingType = ref();

const loadEvents = async () => {
  const data = {
    page: page.value,
    per_page: pageSize.value,
    filter: {
      type_eq: filterType.value,
      city_id_eq: filterCity.value,
      with_city: true,
    },
  };

  try {
    await store.dispatch('getAllEventsData', data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      notifyError(error);
    }
  }
};

const loadCities = async () => {
  try {
    await store.dispatch('cities/getCities');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      notifyError(error);
    }
  }
};

const openModal = () => {
  store.dispatch('updateMode', 'save');
  store.commit('updateEventData', {});
  creatingType.value = null;
  isModalVisible.value = true;
};

const openModalEdit = (event: EventItem) => {
  store.dispatch('updateMode', 'edit');
  store.commit('updateEventData', event);
  creatingType.value = event.type;
  nextTick(() => {
    isModalVisible.value = true;
  });
};

const closeModal = () => {
  isModalVisible.value = false;
  creatingType.value = null;
  eventId.value = undefined;
};

const deleteEvent = async (id: number) => {
  try {
    await store.dispatch('deleteEventData', id);

    notifySuccess('Событие успешно удалено!');

    loadEvents();
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      notifyError(error);
    }
  }
};

const сonfirmDeleting = (event: any) => {
  if (!event?.id) return;

  dialog.warning({
    title: 'Удалить событие?',
    positiveText: 'Подтвердить',
    negativeText: 'Отменить',
    draggable: true,
    onPositiveClick: () => {
      deleteEvent(event.id);
    },
  });
};

watch(
  [page, pageSize],
  ([newPage, newSize], [oldPage, oldSize]) => {
    if (newPage !== oldPage || newSize !== oldSize) {
      loadEvents();
    }
  },
  { deep: true },
);

watch(
  [filterType, filterCity],
  ([newType, newCity], [oldType, oldCity]) => {
    if (newType !== oldType || newCity !== oldCity) {
      loadEvents();
    }
  },
  { deep: true },
);

loadEvents();
loadCities();
</script>
