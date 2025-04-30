<script setup lang="ts">
  import EventModal from '../components/Modals/EventModal.vue';
  import {
    NButton,
    NList,
    NListItem,
    NFlex,
    NLayoutContent,
    NSpace,
    NH1,
    NText,
  } from 'naive-ui';
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { deleteEvent as apiDeleteEvent } from '../services/api'; // функция для удаления события

  const store = useStore();
  const storeEvents = computed(() => store.state.events);

  const events = ref(storeEvents);
  const isModalVisible = ref(false);
  const modalFormType = ref('');
  const modalFormData = ref({});

  const openModal = (type: string, event = {}) => {
    modalFormType.value = type;
    modalFormData.value = event;
    isModalVisible.value = true;
  };

  const closeModal = () => {
    isModalVisible.value = false;
    modalFormType.value = '';
    modalFormData.value = {};
  };

  const deleteEvent = async (id: number) => {
    try {
      await apiDeleteEvent(id);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
</script>

<template>
  <n-space
    vertical
    size="large"
  >
    <n-flex
      justify="end"
      style="padding: 16px"
    >
      <n-button
        @click="openModal('daily')"
        size="medium"
        type="info"
      >
        + Дуйлик
      </n-button>
      <n-button
        @click="openModal('tournament')"
        size="medium"
        type="info"
      >
        + Турнир
      </n-button>
    </n-flex>

    <n-layout>
      <div style="padding-left: 16px">
        <n-h1
          prefix="bar"
          style="padding: 16px"
        >
          <n-text type="primary"> Список событий </n-text>
        </n-h1>
      </div>
      <n-layout-content
        ref="contentRef"
        content-style="padding: 16px;"
        :native-scrollbar="false"
      >
        <n-list
          bordered
          class="event-item"
        >
          <n-list-item
            v-for="event in events"
            :key="event.id"
          >
            <n-flex justify="space-between">
              <n-flex>
                <div>{{ event.title }}</div>
                <div>{{ event.date }}</div>
                <div>{{ event.description }}</div>
              </n-flex>
              <n-flex>
                <n-button
                  @click="openModal(event.type, event)"
                  type="info"
                  secondary
                >
                  Edit
                </n-button>
                <n-button
                  @click="deleteEvent(event.id)"
                  type="info"
                  secondary
                >
                  Delete
                </n-button>
              </n-flex>
            </n-flex>
          </n-list-item>
        </n-list>
      </n-layout-content>
    </n-layout>

    <EventModal
      :isVisible="isModalVisible"
      :formType="modalFormType"
      :formData="modalFormData"
      @close="closeModal"
    />
  </n-space>
</template>
