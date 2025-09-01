<template>
  <n-data-table
    :columns="columns"
    :data="data"
    default-expand-all
    @update:sorter="handleSorterChange"
  />
</template>

<script setup lang="ts">
import { h, ref, computed } from 'vue';
import { NDataTable, NButton, NTag, DataTableBaseColumn, DataTableSortState } from 'naive-ui';
import { EventItem, WeekDayEnum, FormatEnum } from '../../types/events';

interface Props {
  events: EventItem[];
  cities: City[];
}

interface RowData {
  type: string;
  name: string;
  city: string;
  date: string;
  time: string;
  place: string;
  weekday: string;
  price: string;
  format: string;
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
      sortOrder: false,
      sorter: 'default',
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
      sortOrder: false,
      sorter: 'default',
      render(row: any) {
        return h('span', row.name || '-');
      },
    },
    {
      title: 'Город',
      key: 'city',
      sortOrder: false,
      sorter: 'default',
      render(row: any) {
        return h('span', row.city.name);
      },
    },
    {
      title: 'Место проведения',
      key: 'place',
      sortOrder: false,
      sorter: 'default',
    },
    {
      title: 'День недели',
      key: 'weekday',
      sortOrder: false,
      sorter: 'default',
      render(row: any) {
        const weekday = WeekDayEnum[row.weekday as keyof typeof WeekDayEnum] || '-';
        return h('span', weekday);
      },
    },
    {
      title: 'Дата',
      key: 'date',
      sortOrder: false,
      sorter: 'default',
      render(row: any) {
        if (!row.date) return h('span', '-');

        const date = new Date(row.date);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formatted = `${day}.${month}.${year}`;
        return h('span', formatted);
      },
    },
    { title: 'Время', key: 'time', sortOrder: false, sorter: 'default' },
    {
      title: 'Формат',
      key: 'format',
      sortOrder: false,
      sorter: 'default',
      render(row: any) {
        const format = FormatEnum[row.format as keyof typeof FormatEnum] || '-';
        return h('span', format);
      },
    },
    { title: 'Цена, руб.', key: 'price', sortOrder: false, sorter: 'default' },
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
  ] as any;
}

const data = computed(() => formatEvents(props.events));
const columns = ref(createColumns(emit));

function handleSorterChange(sorter: DataTableSortState) {
  columns.value.forEach((column: DataTableBaseColumn<RowData>) => {
    /** column.sortOrder !== undefined means it is uncontrolled */
    if (column.sortOrder === undefined) return;
    if (!sorter) {
      column.sortOrder = false;
      return;
    }
    if (column.key === sorter.columnKey) column.sortOrder = sorter.order;
    else column.sortOrder = false;
  });
}
</script>
