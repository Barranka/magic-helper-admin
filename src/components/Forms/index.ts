export const formatInfo: Record<EventFormat, { value: EventFormat; label: string; }>  = {
    pioneer:   { value: 'pioneer',   label: 'Пионер' },
    standart:  { value: 'standart',  label: 'Стандарт' },
    modern:    { value: 'modern',    label: 'Модерн' },
    legacy:    { value: 'legacy',    label: 'Легаси' },
    pauper:    { value: 'pauper',    label: 'Паупер' },
    premodern: { value: 'premodern', label: 'Премодерн' },
    other:     { value: 'other',     label: 'Другое' },
  };

export const dayInfo: Record<WeekDay, { value: WeekDay; label: string }> = {
  monday:    { value: 'monday',    label: 'Понедельник' },
  tuesday:   { value: 'tuesday',   label: 'Вторник' },
  wednesday: { value: 'wednesday', label: 'Среда' },
  thursday:  { value: 'thursday',  label: 'Четверг' },
  friday:    { value: 'friday',    label: 'Пятница' },
  saturday:  { value: 'saturday',  label: 'Суббота' },
  sunday:    { value: 'sunday',    label: 'Воскресенье' },
};
