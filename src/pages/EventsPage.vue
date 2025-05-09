<script setup lang="ts">
  import EventModal from '../components/Modals/EventModal.vue';
  import {
    NButton,
    NList,
    NListItem,
    NFlex,
    NLayoutContent,
    NSpace,
    NH3,
    NText,
    NEmpty,
    NSpin,
    NGradientText,
    NTag,
    useNotification,
    useDialog,
  } from 'naive-ui';
  import { ref, computed } from 'vue';
  import axios from 'axios';
  import { useStore } from 'vuex';
  import { deleteDailyEvent, deleteTournamentEvent } from '../services/api';
  import { formatInfo } from '../components/Forms/index';

  const dialog = useDialog();
  const notification = useNotification();
  const store = useStore();

  const storeEvents = computed(() => store.getters.getAllEventsData);
  const isLoading = computed(() => store.getters.getLoading);

  const events = ref(storeEvents);
  const isModalVisible = ref(false);
  const modalFormType = ref<EventType | null>(null);
  const eventId = ref<EventId | null>(null);

  const loadEvents = async () => {
    await store.dispatch('getAllEventsData');
  };

  const openModal = (type: EventType, event: EventItem | null = null) => {
    isModalVisible.value = true;
    modalFormType.value = type;
    eventId.value = event?.id || null;
  };

  const closeModal = () => {
    isModalVisible.value = false;
    modalFormType.value = null;
    eventId.value = null;
  };

  const deleteEvent = async (id: number, type: EventType) => {
    try {
      type === 'daily'
        ? await deleteDailyEvent(id)
        : await deleteTournamentEvent(id);

      notification.success({
        content: 'Событие успешно удалено!',
        duration: 2500,
        keepAliveOnHover: true,
      });

      loadEvents();
    } catch (error: unknown) {
      console.error('Error deleting event:', error);
      if (axios.isAxiosError(error)) {
        notification.error({
          content: error.response?.data,
          duration: 2500,
          keepAliveOnHover: true,
        });
      }
    }
  };

  const handleConfirmDeleting = (id: number, event: EventType) => {
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
      <n-flex
        v-if="events.length"
        justify="space-between"
      >
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
        <n-flex style="padding: 16px">
          <n-button
            @click="openModal('daily')"
            size="medium"
            type="info"
          >
            ➕ Дейлик
          </n-button>
          <n-button
            @click="openModal('tournament')"
            size="medium"
            type="info"
          >
            ➕ Турнир
          </n-button>
        </n-flex>
      </n-flex>

      <n-empty
        v-if="!events.length && !isLoading"
        status="info"
        description='Доступных событий нет. Чтобы добавить новое событие нажмите кнопку для добавления "Дейлик" или "Турнир"'
        style="margin-top: 36px"
      >
        <template #extra>
          <n-flex style="padding: 16px">
            <n-button
              @click="openModal('daily')"
              size="medium"
              type="info"
            >
              + Дейлик
            </n-button>
            <n-button
              @click="openModal('tournament')"
              size="medium"
              type="info"
            >
              + Турнир
            </n-button>
          </n-flex>
        </template>
      </n-empty>

      <n-layout v-else>
        <n-h3 style="padding-left: 16px">
          <n-text
            type="info"
            :size="36"
          >
            Список событий
          </n-text>
        </n-h3>
        <n-layout-content
          ref="contentRef"
          :native-scrollbar="false"
        >
          <n-list
            bordered
            hoverable
            class="event-item"
          >
            <n-list-item
              v-for="event in events"
              :key="event.id"
            >
              <n-flex justify="space-between">
                <n-flex vertical>
                  <n-flex>
                    <n-tag
                      :type="event.type === 'daily' ? 'info' : 'warning'"
                      :bordered="false"
                    >
                      {{ event.type === 'daily' ? 'Дейлик' : 'Турнир' }}
                    </n-tag>
                    <n-text strong>
                      Тип:
                      {{
                        formatInfo[event.format as EventFormat]?.label || '-'
                      }}
                    </n-text>
                  </n-flex>
                  <div>{{ event.description }}</div>
                  <div>
                    <n-text strong>Место проведения:</n-text> {{ event.city }},
                    {{ event.place }},
                    <n-a
                      :href="event.mapUrl"
                      target="_blank"
                    >
                      <n-text underline>на карте 📍</n-text>
                    </n-a>
                  </div>
                  <div>
                    <n-text strong>📅 Дата и время:</n-text> {{ event.day }},
                    {{ event.time }}
                  </div>
                </n-flex>
                <n-flex>
                  <n-button
                    @click="openModal(event.type, event)"
                    type="info"
                    secondary
                  >
                    Редактировать ✏️
                  </n-button>
                  <n-button
                    @click="handleConfirmDeleting(event.id, event.type)"
                    type="info"
                    secondary
                  >
                    Удалить 🗑️
                  </n-button>
                </n-flex>
              </n-flex>
            </n-list-item>
          </n-list>
        </n-layout-content>
      </n-layout>

      <EventModal
        :isVisible="isModalVisible"
        :type="modalFormType"
        :id="eventId"
        @close="closeModal"
        @closeModal="isModalVisible = false"
        @reload="loadEvents()"
      />
    </n-space>
  </n-spin>
</template>
