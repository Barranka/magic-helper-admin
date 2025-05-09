type EventItem = DailyEvent | TournamentEvent;
type EventFormat =
  | "pioneer"
  | "standart"
  | "modern"
  | "legacy"
  | "pauper"
  | "premodern"
  | "other";

type EventType = 'daily' | 'tournament';

type EventMode = 'save' | 'edit';

type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

interface EventId {
   id: number;
}

interface BannerItem {
   file: File;
   [key: string]: any; // если там есть другие поля, можно уточнить
 }

interface DailyEvent {
   type: 'daily';
   city: string;
   place: string;
   day: WeekDay;
   time: string;
   mapUrl: string;
   format: EventFormat;
   price: string;
   description: string;
   id: EventId;
}

interface TournamentEvent {
   type: 'tournament';
   name: string;
   banner:  BannerItem[];
   city: string;
   place: string;
   day: WeekDay;
   time: string;
   mapUrl: string;
   format: EventFormat;
   price: string;
   description: string;
   theme: string;
   id: EventId;
}
