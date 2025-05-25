import { computed } from 'vue';

export function useEventType(type: any) {
  const isDailyEvent = computed(() => type.value === 'daily');
  const isTournamentEvent = computed(() => type.value === 'tournament');

  return {
    isDailyEvent,
    isTournamentEvent,
  };
}
