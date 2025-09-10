<template>
  <n-form ref="formRef" :rules="rules" :model="formData">
    <div style="display: block">
      <n-form-item path="name" label="Название турнира">
        <n-input v-model:value="formData.name" type="text" placeholder="Название турнира" />
      </n-form-item>

      <n-form-item path="banner" label="Баннер турнира">
        <n-input v-model:value="formData.banner" type="text" placeholder="Банер" />
      </n-form-item>

      <n-grid :x-gap="12" :cols="2">
        <n-grid-item>
          <n-form-item path="city" label="Город">
            <n-select
              v-model:value="formData.city_id"
              :options="optionsCities"
              filterable
              placeholder="Город события"
              clearable
              :loading="loadingCities"
              @search="loadCities"
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item path="place" label="Место/Клуб">
            <n-input v-model:value="formData.place" type="text" placeholder="Место/Клуб" />
          </n-form-item>
        </n-grid-item>
      </n-grid>

      <n-form-item path="date" label="Дата турнира">
        <n-date-picker
          v-model:value="dateProxy"
          type="date"
          clearable
          format="dd-MM-yyyy"
          placeholder="Дата"
          style="width: 100%"
        />
      </n-form-item>

      <n-form-item path="time" label="Время турнира">
        <n-time-picker
          v-model:formatted-value="formData.time"
          format="HH:mm"
          placeholder="Время турнира"
          clearable
          style="width: 100%"
        />
      </n-form-item>

      <n-form-item path="format" label="Формат">
        <n-select
          v-model:value="formData.format"
          :options="formatOptions"
          placeholder="Формат"
          clearable
        />
      </n-form-item>

      <n-form-item path="price" label="Стоимость">
        <n-input v-model:value="formData.price" type="text" placeholder="Стоимость" />
      </n-form-item>

      <n-form-item path="description" label="Описание">
        <n-input v-model:value="formData.description" type="textarea" placeholder="Описание" />
      </n-form-item>

      <n-form-item path="theme" label="Тема на топдеке">
        <n-input v-model:value="formData.theme" type="text" placeholder="Тема на топдеке" />
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
  NForm,
  NFormItem,
  NDatePicker,
  NTimePicker,
  FormInst,
} from 'naive-ui';
import { formatOptions } from './index';
import { watch, computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useNotify } from '../../composables/useNotify';
import { parseISO, set, formatISO } from 'date-fns';

const store = useStore();
const { notifyError } = useNotify();

const loadingCities = ref(false);
const formRef = ref<FormInst | null>(null);
const formData = reactive({
  type: 'EVENT_TYPE_TOURNAMENT',
  name: '',
  banner: '',
  city_id: '',
  place: '',
  date: null as string | null,
  time: null,
  map_url: '',
  format: null,
  price: '',
  description: '',
  theme: '',
});

const storeCities = computed(() => store.getters['cities/cities']);
const optionsCities = computed(() =>
  storeCities.value?.map((city: City) => ({ label: city.name, value: city.id })),
);

const dateProxy = computed<number | null>({
  get(): number | null {
    if (!formData.date) return null;
    return new Date(formData.date).getTime();
  },
  set(val: number | null) {
    if (!val) {
      formData.date = null;
      return;
    }

    const localDate = new Date(val);
    // Извлекаем компоненты дня локально, но потом формируем UTC
    const year = localDate.getFullYear();
    const month = localDate.getMonth();
    const day = localDate.getDate();

    // Новый Date только в UTC
    const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    // Формируем ISO UTC с Z
    formData.date = utcDate.toISOString();
  },
});

const rules = {
  name: {
    required: true,
    message: 'Введите наименование турнира',
    trigger: 'input',
  },
  city_id: { required: true, message: 'Введите город', trigger: 'input' },
  place: { required: true, message: 'Введите место', trigger: ['input'] },
  date: { required: true, message: 'Выберите дату и время турнира', trigger: ['change'] },
  format: { required: true, message: 'Выберите формат', trigger: ['change'] },
  price: { required: true, message: 'Введите цену', trigger: ['input'] },
};

watch(
  formData,
  (newVal) => {
    store.commit('updateEventData', newVal);
  },
  { deep: true },
);

const validateForm = async () => {
  try {
    await formRef.value?.validate();
    return true;
  } catch (err) {
    return false;
  }
};

const getDefaultFormData = () => {
  const data = store.getters.getEventDataDefault;

  if (!data || Object.keys(data).length === 0) return;

  Object.assign(formData, data);
};

const loadCities = async (query?: string) => {
  if (query && query.length <= 3) return;

  try {
    loadingCities.value = true;

    await store.dispatch('cities/getCities', query);
  } catch (error: unknown) {
    console.log(error, 'error');
    notifyError(error);
  } finally {
    loadingCities.value = false;
  }
};

defineExpose({ validateForm });

getDefaultFormData();
</script>
