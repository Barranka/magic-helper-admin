<template>
  <n-data-table :columns="columns" :data="data" default-expand-all />
</template>

<script setup lang="ts">
import { h, ref, computed } from 'vue';
import { NDataTable, NButton, NTag } from 'naive-ui';
import { EventItem, WeekDayEnum, FormatEnum } from '../../types/events';

interface Props {
  events: EventItem[];
  cities: City[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'edit', event: any): void;
  (e: 'delete', event: any): void;
}>();

function formatEvents(events: EventItem[]) {
  return events.map((event) => ({
    type: event.type,
    name: event.name,
    city: event.city,
    city_id: event.city_id,
    place: event.place,
    weekday: event.weekday,
    time: event.time,
    format: event.format,
    price: event.price,
    description: event.description,
    theme: event.theme,
    map_url: event.map_url,
    banner: event.banner,
    id: event.id,
    date: event.date,
  }));
}

function createColumns(emit: ReturnType<typeof defineEmits>) {
  return [
    {
      title: 'Тип',
      key: 'type',
      render(row: any) {
        return h(
          NTag,
          {
            style: {
              marginRight: '6px',
            },
            type: row.type === 'EVENT_TYPE_DAILY' ? 'info' : 'warning',
            bordered: false,
          },
          {
            default: () => (row.type === 'EVENT_TYPE_DAILY' ? 'Дейлик' : 'Турнир'),
          },
        );
      },
    },

    {
      title: 'Название',
      key: 'name',
      render(row: any) {
        return h('span', row.name || '-');
      },
    },
    {
      title: 'Город',
      key: 'city',
      render(row: any) {
        return h('span', row.city.name);
      },
    },
    { title: 'Место проведения', key: 'place' },
    {
      title: 'День недели',
      key: 'weekday',
      render(row: any) {
        console.log(row.weekday, 'rowrowrow');
        const weekday = WeekDayEnum[row.weekday as keyof typeof WeekDayEnum] || '-';
        return h('span', weekday);
      },
    },
    { title: 'Дата', key: 'date' },
    { title: 'Время', key: 'time' },
    {
      title: 'Формат',
      key: 'format',
      render(row: any) {
        console.log(row.weekday, 'rowrowrow');
        const format = FormatEnum[row.format as keyof typeof FormatEnum] || '-';
        return h('span', format);
      },
    },
    { title: 'Цена, руб.', key: 'price' },
    {
      title: 'Редактировать',
      key: 'edit',
      render(row: any) {
        return h(
          NButton,
          {
            type: 'info',
            size: 'small',
            secondary: true,
            onClick: () => {
              emit('edit', row);
            },
          },
          { default: () => '✏️' },
        );
      },
    },

    {
      title: 'Удалить',
      key: 'delete',
      render(row: any) {
        return h(
          NButton,
          {
            type: 'info',
            secondary: true,
            size: 'small',
            onClick: () => {
              emit('delete', row);
            },
          },
          { default: () => '🗑️' },
        );
      },
    },
  ];
}

const data = computed(() => formatEvents(props.events));
const columns = ref(createColumns(emit));
</script>
