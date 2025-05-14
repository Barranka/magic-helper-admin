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
          v-model:file-list="fileList"
          @before-upload="beforeUpload"
        >
          <n-button
            :disabled="fileList.length === 1"
            secondary
          >
            Загрузить баннер
          </n-button>
        </n-upload>
      </n-form-item>

      <n-grid
        :x-gap="12"
        :cols="2"
      >
        <n-grid-item>
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
        </n-grid-item>
        <n-grid-item>
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
        </n-grid-item>
      </n-grid>

      <n-grid
        :x-gap="12"
        :cols="2"
      >
        <n-grid-item>
          <n-form-item
            path="day"
            label="Дата турнира"
          >
            <n-date-picker
              v-model:formatted-value="formData.day"
              value-format="dd-MM-yyyy"
              format="dd-MM-yyyy"
              type="date"
              placeholder="Дата турнира"
              clearable
              style="width: 100%"
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
    NGrid,
    NGridItem,
    NTimePicker,
    NForm,
    NFormItem,
    NUpload,
    NButton,
    NDatePicker,
    FormInst,
  } from 'naive-ui';
  import type { UploadFileInfo } from 'naive-ui';
  import { formatInfo } from './index';
  import { watch, reactive, watchEffect, toRaw, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useNotify } from '../../composables/useNotify';

  const store = useStore();
  const { notifyError } = useNotify();

  defineProps({
    mode: { type: String, default: 'create' },
  });

  const formRef = ref<FormInst | null>(null);

  const formData = reactive<TournamentEvent>({
    name: '',
    banner: null,
    city: '',
    place: '',
    day: null,
    time: '',
    mapUrl: '',
    format: null,
    price: '',
    description: '',
    theme: '',
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

  const fileList = ref([]);

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

  watch(fileList, (newVal) => {
    handleFileChange(newVal[0]);
  });

  const formatOptions = Object.values(formatInfo);

  const validateForm = async () => {
    try {
      await formRef.value?.validate();
      return true;
    } catch (err) {
      return false;
    }
  };

  const beforeUpload = async (data: {
    file: UploadFileInfo;
    fileList: UploadFileInfo[];
  }) => {
    if (!['image/png', 'image/jpeg'].includes(data.file.file?.type || '')) {
      notifyError(
        'Баннер может быть только "image/png" или "image/jpg" формата.'
      );
      return false;
    }
    return true;
  };

  const handleFileChange = async (file: UploadFileInfo) => {
    if (file && file?.file) {
      const rawFile = file.file;

      if (rawFile instanceof File) formData.banner = rawFile;
    }
  };

  defineExpose({ validateForm });
</script>
