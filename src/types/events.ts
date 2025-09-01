export type EventFormat =
'FORMAT_PIONEER' |
'FORMAT_STANDARD' |
'FORMAT_MODERN' |
'FORMAT_LEGACY' |
'FORMAT_PAUPER' |
'FORMAT_PREMODERN' |
'FORMAT_DUEL_COMMANDER' |
'FORMAT_EDH';

export type EventType = 'EVENT_TYPE_DAILY' | 'EVENT_TYPE_TOURNAMENT';

export type EventMode = 'save' | 'edit';

export type WeekDay = 'WEEKDAY_MONDAY' | 'WEEKDAY_TUESDAY' | 'WEEKDAY_WEDNESDAY' | 'WEEKDAY_THURSDAY' | 'WEEKDAY_FRIDAY' | 'WEEKDAY_SATURDAY' | 'WEEKDAY_SUNDAY';

export interface EventId {
  id?: number;
}

export interface EventItem {
  id?: EventId;
  type?: EventType;
  format: EventFormat;
  city: City;
  city_id: string;
  place: string;
  price: string;
  weekday: WeekDay;
  time: string | null;
  date: Date;
  map_url: string;
  image_url: string;
  banner: string;
  name: string;
  theme: string;
  description: string;
}

export interface PaginationListEvent {
  page: string;
  per_page: string;
}

export interface FiltersListEvent {
  type_eq: EventType;
  city_id_eq: string;
  with_city: Boolean;
}

export interface RequestBodyListEvent extends PaginationListEvent {
  filter: FiltersListEvent;
}

export enum EventEnum {
  EVENT_TYPE_DAILY = 'Дейлик',
  EVENT_TYPE_TOURNAMENT = 'Турник',
}

export enum WeekDayEnum {
  WEEKDAY_MONDAY = 'Понедельник',
  WEEKDAY_TUESDAY = 'Вторник',
  WEEKDAY_WEDNESDAY = 'Среда',
  WEEKDAY_THURSDAY = 'Четверг',
  WEEKDAY_FRIDAY = 'Пятница',
  WEEKDAY_SATURDAY = 'Суббота',
  WEEKDAY_SUNDAY = 'Воскресенье',
}

export enum FormatEnum {
  FORMAT_EDH = 'EDH',
  FORMAT_DUEL_COMMANDER = 'COMMANDER',
  FORMAT_HISTORIC = 'HISTORIC',
  FORMAT_LEGACY = 'LEGACY',
  FORMAT_MODERN = 'MODERN',
  FORMAT_PAUPER = 'PAUPER',
  FORMAT_PIONEER = 'PIONEER',
  FORMAT_PREMODERN = 'PREMODERN',
  FORMAT_STANDARD = 'STANDARD',
  FORMAT_DRAFT = 'DRAFT',
  FORMAT_DUELEDH = 'DUELEDH',
  FORMAT_HERITAGE = 'HERITAGE',
}
