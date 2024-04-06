import { defineStore } from 'pinia';

interface StoreState {
  query: string;
}

export const useStore = defineStore('store', {
  state: (): StoreState => ({
    query: ''
  })
});
