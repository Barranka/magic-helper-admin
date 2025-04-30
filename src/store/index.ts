// store/index.ts
import { updateEvent } from '@/services/api';
import { createStore } from 'vuex';

export const store = createStore({
  state: {
    events: [
        {
            title: 'title',
            date: 'date',
            description: 'description',
            id: 1,
        },
        {
          title: 'title',
          date: 'date',
          description: 'description',
          id: 2,
      },
      {
        title: 'title',
        date: 'date',
        description: 'description',
        id: 3,
    },
    {
      title: 'title',
      date: 'date',
      description: 'description',
      id: 4,
  },
    {
      title: 'title',
      date: 'date',
      description: 'description',
      id: 5,
  }
    ],
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    events: (state) => state.events,
  },
});
