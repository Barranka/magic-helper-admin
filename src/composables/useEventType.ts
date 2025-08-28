import { computed } from 'vue';

export function useEventType(type: any) {
  const isDailyEvent = computed(() => type.value === 'EVENT_TYPE_DAILY');
  const isTournamentEvent = computed(() => type.value === 'EVENT_TYPE_TOURNAMENT');

  return {
    isDailyEvent,
    isTournamentEvent,
  };
}
