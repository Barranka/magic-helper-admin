<template>
  <n-form
    ref="formRef"
    :rules="rules"
    :model="formData"
  >
    <div style="display: block">
      <n-form-item
        path="city"
        label="Город"
      >
        <n-input
          v-model:value="formData.city"
          type="text"
          placeholder="Город"
        />
      </n-form-item>

      <n-form-item
        path="place"
        label="Место/Клуб"
      >
        <n-input
          v-model:value="formData.place"
          type="text"
          placeholder="Место/Клуб"
        />
      </n-form-item>

      <n-grid
        :x-gap="12"
        :cols="2"
      >
        <n-grid-item>
          <n-form-item
            path="day"
            label="День недели"
          >
            <n-select
              v-model:value="formData.day"
              :options="daysOptions"
              placeholder="День недели"
              clearable
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item>
          <n-form-item
            path="time"
            label="Время"
          >
            <n-time-picker
              v-model:formatted-value="formData.time"
              value-format="HH:mm"
              format="HH:mm"
              placeholder="Время"
              clearable
              style="width: 100%"
            />
          </n-form-item>
        </n-grid-item>
      </n-grid>

      <n-form-item
        path="mapUrl"
        label="Ссылка на Яндекс карты"
      >
        <n-input
          v-model:value="formData.mapUrl"
          type="text"
          placeholder="Ссылка на Яндекс карты"
        />
      </n-form-item>

      <n-form-item
        path="format"
        label="Формат"
      >
        <n-select
          v-model:value="formData.format"
          :options="formatOptions"
          placeholder="Формат"
          clearable
        />
      </n-form-item>

      <n-form-item
        path="price"
        label="Стоимость"
      >
        <n-input
          v-model:value="formData.price"
          type="text"
          placeholder="Стоимость"
        />
      </n-form-item>

      <n-form-item
        path="description"
        label="Описание"
      >
        <n-input
          v-model:value="formData.description"
          type="textarea"
          placeholder="Описание"
        />
      </n-form-item>
    </div>
  </n-form>
</template>

<script setup lang="ts">
  import {
    NInput,
    NSelect,
    NGrid,
    NGridItem,
    NTimePicker,
    NForm,
    NFormItem,
    FormInst,
  } from 'naive-ui';
  import { formatInfo, dayInfo } from './index';
  import { reactive, watchEffect, toRaw, watch, ref } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  defineProps({
    mode: { type: String, default: 'create' },
  });

  const formRef = ref<FormInst | null>(null);
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

  const rules = {
    city: { required: true, message: 'Введите город', trigger: 'input' },
    place: { required: true, message: 'Введите место', trigger: ['input'] },
    day: { required: true, message: 'Выберите день', trigger: ['input'] },
    time: { required: true, message: 'Выберите время', trigger: ['change'] },
    format: { required: true, message: 'Выберите формат', trigger: ['change'] },
    price: { required: true, message: 'Введите цену', trigger: ['input'] },
  };

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
  const daysOptions = Object.values(dayInfo);

  const validateForm = async () => {
    try {
      await formRef.value?.validate();
      return true;
    } catch (err) {
      return false;
    }
  };

  defineExpose({ validateForm });
</script>
