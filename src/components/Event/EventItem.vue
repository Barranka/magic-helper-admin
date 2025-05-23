<script setup lang="ts">
  import { computed } from 'vue';
  import { formatInfo, dayInfo } from '../Forms/index';
  import { useEventType } from '../../composables/useEventType';
  import { NButton, NFlex, NA, NText, NTag, NImage } from 'naive-ui';

  interface Props {
    event: EventItem;
  }

  const props = defineProps<Props>();

  const { isDailyEvent } = useEventType(props.event.type);

  const emit = defineEmits<{
    (e: 'edit'): void;
    (e: 'delete'): void;
  }>();

  const tournamentBanner = computed(
    () => props.event.type === 'tournament' && props.event?.banner
  );
</script>

<template>
  <n-flex justify="space-between">
    <n-flex vertical>
      <n-flex align="center">
        <n-tag
          :type="isDailyEvent ? 'info' : 'warning'"
          :bordered="false"
        >
          {{ isDailyEvent ? 'Дейлик' : 'Турнир' }}
        </n-tag>
        <n-text strong>
          Тип:
          {{ formatInfo[props.event.format as EventFormat]?.label || '-' }}
        </n-text>
      </n-flex>
      <div>{{ props.event.description }}</div>
      <div>
        <n-text strong>Место проведения:</n-text>
        {{ props.event.city || '-' }}, {{ props.event.place || '-' }},
        <n-a
          :href="event.mapUrl"
          target="_blank"
        >
          <n-text underline>посмотреть на карте 📍</n-text>
        </n-a>
      </div>
      <div>
        <n-text strong>📅 День и время:</n-text>
        {{ dayInfo[props.event.day as WeekDay]?.label || '-' }},
        {{ props.event.time }}
      </div>

      <div v-if="tournamentBanner">
        <n-image :src="tournamentBanner[0]?.fullPath">
          <template #error>
            <n-text type="error">Баннер не прогрузился</n-text>
          </template>
        </n-image>
      </div>
    </n-flex>
    <n-flex>
      <n-button
        @click="emit('edit')"
        type="info"
        secondary
      >
        Редактировать ✏️
      </n-button>
      <n-button
        @click="emit('delete')"
        type="info"
        secondary
      >
        Удалить 🗑️
      </n-button>
    </n-flex>
  </n-flex>
</template>
