<template>
  <form @submit.prevent>
    <n-flex vertical>
      <n-input
        v-model:value="formData.city"
        type="text"
        placeholder="Город"
      />

      <n-input
        v-model:value="formData.place"
        type="text"
        placeholder="Место/Клуб"
      />

      <n-date-picker
        v-model:formatted-value="formData.day"
        value-format="dd.MM.yyyy"
        type="date"
        placeholder="День недели"
        clearable
      />

      <n-time-picker
        v-model:formatted-value="formData.time"
        value-format="HH:mm:ss"
        placeholder="Время"
        clearable
      />

      <n-input
        v-model:value="formData.mapUrl"
        type="text"
        placeholder="Ссылка на Яндекс карты"
      />

      <n-select
        v-model:value="formData.format"
        :options="formatOptions"
        placeholder="Формат"
        clearable
      />

      <n-input
        v-model:value="formData.price"
        type="text"
        placeholder="Стоимость"
      />

      <n-input
        v-model:value="formData.description"
        type="textarea"
        placeholder="Описание"
      />
    </n-flex>
  </form>
</template>

<script setup lang="ts">
  import { NInput, NSelect, NDatePicker, NTimePicker, NFlex } from 'naive-ui';
  import { formatInfo } from './index';
  import { reactive, watchEffect, toRaw, watch } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  defineProps({
    mode: { type: String, default: 'create' },
  });

  const formData = reactive({
    city: '',
    place: '',
    day: '',
    time: '',
    mapUrl: '',
    format: null,
    price: '',
    description: '',
  });

  watchEffect(() => {
    const data = toRaw(store.getters.getDailyEventData);

    if (!data || Object.keys(data).length === 0) return;

    Object.assign(formData, data);
  });

  watch(
    formData,
    (newVal) => {
      store.commit('updateDailyEventData', toRaw(newVal));
    },
    { deep: true }
  );

  const formatOptions = Object.values(formatInfo);
</script>
