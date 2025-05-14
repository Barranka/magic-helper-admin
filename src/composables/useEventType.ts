import { computed } from 'vue';

export function useEventType(type?: 'daily' |  'tournament') {
  const isDailyEvent = computed(() => type === 'daily');
  const isTournamentEvent = computed(() => type === 'tournament');

  return {
    isDailyEvent,
    isTournamentEvent,
  };
}
