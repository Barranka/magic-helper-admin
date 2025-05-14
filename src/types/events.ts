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

interface DailyEvent {
   type?: 'daily';
   city: string;
   place: string;
   day: WeekDay;
   time: string;
   mapUrl: string;
   format: EventFormat | null;
   price: string;
   description: string;
   id?: EventId;
}

interface TournamentEvent {
   type?: 'tournament';
   name: string;
   banner:  File | null;
   city: string;
   place: string;
   day: WeekDay | null;
   time: string;
   mapUrl: string;
   format: EventFormat | null;
   price: string;
   description: string;
   theme: string;
   id?: EventId;
}

interface FormattedEventRow {
   type: string;
   name: string;
   city: string;
   place: string;
   day: string | null;
   time: string | null;
   format: string | null;
   price: string;
   description: string;
   theme?: string;
   banner?: File | null;
   mapUrl?: string;
 }
