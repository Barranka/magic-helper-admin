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

interface EventId {
   id: number;
}

interface DailyEvent {
   type: 'daily';
   city: string;
   place: string;
   day: string | Date;
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
   banner:  File | string;
   city: string;
   place: string;
   day: Date;
   time: string;
   mapUrl: string;
   format: EventFormat;
   price: string;
   description: string;
   theme: string;
   id: EventId;
}
