<template>
  <n-form ref="formRef" :rules="rules" :model="formData">
    <div style="display: block">
      <n-form-item path="city" label="Город">
        <n-select
          v-model:value="formData.city_id"
          :options="optionsCities"
          filterable
          placeholder="Город события"
          clearable
        />
      </n-form-item>

      <n-form-item path="place" label="Место/Клуб">
        <n-input v-model:value="formData.place" type="text" placeholder="Место/Клуб" />
      </n-form-item>

      <n-grid :x-gap="12" :cols="2">
        <n-grid-item>
          <n-form-item path="weekday" label="День недели">
            <n-select
              v-model:value="formData.weekday"
              :options="daysOptions"
              placeholder="День недели"
              clearable
            />
          </n-form-item>
        </n-grid-item>

        <n-grid-item>
          <n-form-item path="time" label="Время">
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

      <!-- <n-form-item path="map_url" label="Ссылка на Яндекс карты">
        <n-input
          v-model:value="formData.map_url"
          type="text"
          placeholder="Ссылка на Яндекс карты"
        />
      </n-form-item> -->

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
      <!--
      <n-form-item path="description" label="Описание">
        <n-input v-model:value="formData.description" type="textarea" placeholder="Описание" />
      </n-form-item> -->
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
import { formatOptions } from './index';
import { reactive, watchEffect, toRaw, watch, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { WeekDayEnum } from '../../types/events';

const daysOptions = [
  { value: 'WEEKDAY_MONDAY', label: WeekDayEnum['WEEKDAY_MONDAY'] },
  { value: 'WEEKDAY_TUESDAY', label: WeekDayEnum['WEEKDAY_TUESDAY'] },
  { value: 'WEEKDAY_WEDNESDAY', label: WeekDayEnum['WEEKDAY_WEDNESDAY'] },
  { value: 'WEEKDAY_THURSDAY', label: WeekDayEnum['WEEKDAY_THURSDAY'] },
  { value: 'WEEKDAY_FRIDAY', label: WeekDayEnum['WEEKDAY_FRIDAY'] },
  { value: 'WEEKDAY_SATURDAY', label: WeekDayEnum['WEEKDAY_SATURDAY'] },
  { value: 'WEEKDAY_SUNDAY', label: WeekDayEnum['WEEKDAY_SUNDAY'] },
];

const store = useStore();

const formRef = ref<FormInst | null>(null);
const formData = reactive({
  type: 'EVENT_TYPE_DAILY',
  city_id: '',
  place: '',
  weekday: '',
  time: null,
  map_url: '',
  format: null,
  price: '',
  description: '',
});

const storeCities = computed(() => store.getters['cities/cities']);
const optionsCities = computed(() =>
  storeCities.value.map((city: City) => ({ label: city.name, value: city.id })),
);

const rules = {
  city_id: { required: true, message: 'Введите город', trigger: ['change'] },
  place: { required: true, message: 'Введите место', trigger: ['input'] },
  day: { required: true, message: 'Выберите день', trigger: ['input'] },
  time: { required: true, message: 'Выберите время', trigger: ['change'] },
  format: { required: true, message: 'Выберите формат', trigger: ['change'] },
  price: { required: true, message: 'Введите цену', trigger: ['input'] },
};

watchEffect(() => {
  const data = store.getters.getEventDataDefault;
  if (!data || Object.keys(data).length === 0) return;

  Object.assign(formData, data);
});

watch(
  formData,
  (newVal) => {
    store.commit('updateEventData', toRaw(newVal));
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

defineExpose({ validateForm });
</script>
