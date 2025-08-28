interface City {
  id: string;
  name: string;
  comment: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  links: any;
}

interface CitiesState {
  cities: City[];
}
