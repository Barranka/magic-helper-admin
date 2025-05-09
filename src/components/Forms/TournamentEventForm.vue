<template>
  <n-form
    ref="formRef"
    :rules="rules"
    :model="formData"
  >
    <div style="display: block">
      <n-form-item
        path="name"
        label="Название турнира"
      >
        <n-input
          v-model:value="formData.name"
          type="text"
          placeholder="Название турнира"
        />
      </n-form-item>

      <n-form-item
        path="banner"
        label="Баннер турнира"
      >
        <n-upload
          v-model:file-list="formData.banner"
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
        >
          <n-button secondary> Загрузить баннер </n-button>
        </n-upload>
      </n-form-item>

      <n-form-item
        path="city"
        label="Город и место"
      >
        <n-input
          v-model:value="formData.city"
          type="text"
          placeholder="Город"
          style="margin-right: 10px"
        />

        <n-input
          v-model:value="formData.place"
          type="text"
          placeholder="Место/Клуб"
        />
      </n-form-item>

      <n-form-item
        path="day"
        label="День недели и время"
      >
        <n-select
          v-model:value="formData.day"
          :options="daysOptions"
          placeholder="День недели"
          clearable
          style="margin-right: 10px"
        />
        <n-time-picker
          v-model:formatted-value="formData.time"
          value-format="HH:mm:ss"
          placeholder="Время"
          clearable
        />
      </n-form-item>

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

      <n-form-item
        path="theme"
        label="Тема на топдеке"
      >
        <n-input
          v-model:value="formData.theme"
          type="text"
          placeholder="Тема на топдеке"
        />
      </n-form-item>
    </div>
  </n-form>
</template>

<script setup lang="ts">
  import {
    NInput,
    NSelect,
    NDatePicker,
    NTimePicker,
    NForm,
    NFormItem,
    NUpload,
    NButton,
    FormInst,
  } from 'naive-ui';
  import { formatInfo, dayInfo } from './index';
  import { watch, reactive, watchEffect, toRaw, ref } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  defineProps({
    mode: { type: String, default: 'create' },
  });

  const formRef = ref<FormInst | null>(null);

  const formData = reactive({
    name: null,
    banner: [],
    city: '',
    place: '',
    day: null,
    time: null,
    mapUrl: '',
    format: null,
    price: '',
    description: '',
    theme: null,
  });

  const rules = {
    name: {
      required: true,
      message: 'Введите наименование турнира',
      trigger: 'input',
    },
    city: { required: true, message: 'Введите город', trigger: 'input' },
    place: { required: true, message: 'Введите место', trigger: ['input'] },
    day: { required: true, message: 'Выберите день', trigger: ['input'] },
    time: { required: true, message: 'Выберите время', trigger: ['input'] },
    format: { required: true, message: 'Выберите формат', trigger: ['change'] },
    price: { required: true, message: 'Введите цену', trigger: ['input'] },
  };

  watchEffect(() => {
    const data = store.getters.getTournamentEventData;

    if (!data || Object.keys(data).length === 0) return;

    Object.assign(formData, data);
  });

  watch(
    formData,
    (newVal) => {
      store.commit('updateTournamentEventData', toRaw(newVal));
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
