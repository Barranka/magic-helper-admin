<script setup lang="ts">
  import { h, ref, computed } from 'vue';
  import { NDataTable, NButton, NImage, NTag, NText } from 'naive-ui';

  interface Props {
    events: EventItem[];
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'edit', event: any): void;
    (e: 'delete', event: any): void;
  }>();

  function formatEvents(events: EventItem[]) {
    return events.map((event) => ({
      type: event.type,
      name: event.type === 'tournament' ? event.name ?? '-' : '-',
      city: event.city,
      place: event.place,
      day: event.day ?? '-',
      time: event.time ?? '-',
      format: event.format ?? '-',
      price: event.price,
      description: event.description,
      theme: event.type === 'tournament' ? event.theme ?? '-' : '-',
      mapUrl: event.mapUrl ?? '-',
      banner: event.type === 'tournament' ? event.banner ?? [] : [],
    }));
  }

  function createColumns(emit: ReturnType<typeof defineEmits>) {
    return [
      {
        type: 'expand' as const,
        expandable: (row: any) => row.banner.length,
        renderExpand: (row: any) => {
          // Реактивное состояние для отслеживания загрузки изображения
          const isError = ref(false);

          const bannerUrl =
            row.banner?.[0]?.thumbnailUrl || row.banner?.[0]?.fullPath;

          return bannerUrl
            ? h(NImage, {
                width: 60,
                src: bannerUrl,
                fallbackSrc: '/placeholder.jpg',
                alt: 'banner',
                onError: () => {
                  isError.value = true;
                },
              })
            : isError.value
            ? h(NText, { type: 'error' }, 'Баннер не прогрузился')
            : null;
        },
      },
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
              type: row.type === 'daily' ? 'info' : 'warning',
              bordered: false,
            },
            {
              default: () => (row.type === 'daily' ? 'Дейлик' : 'Турнир'),
            }
          );
        },
      },

      { title: 'Название', key: 'name' },
      { title: 'Город', key: 'city' },
      { title: 'Место проведения', key: 'place' },
      { title: 'День', key: 'day' },
      { title: 'Время', key: 'time' },
      {
        title: 'Ссылка на карту',
        key: 'mapUrl',
        width: 100,
        ellipsis: {
          tooltip: true,
        },
      },
      { title: 'Формат', key: 'format' },
      { title: 'Цена', key: 'price' },
      {
        title: 'Описание',
        key: 'description',
        width: 100,
        ellipsis: {
          tooltip: true,
        },
      },
      {
        title: 'Тема',
        key: 'theme',
        width: 100,
        ellipsis: {
          tooltip: true,
        },
      },

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
              onClick: () => emit('edit', row),
            },
            { default: () => '✏️' }
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
              onClick: () => emit('delete', row),
            },
            { default: () => '🗑️' }
          );
        },
      },
    ];
  }

  const data = computed(() => formatEvents(props.events));
  const columns = ref(createColumns(emit));
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    default-expand-all
  />
</template>
