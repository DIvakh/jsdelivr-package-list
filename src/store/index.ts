import { defineStore } from 'pinia';
import { apiGetSearch } from '../services/package';

interface StoreState {
  packagesSearchResult: {
    objects: Array<{
      package: {
        name: string;
        description: string;
        keywords: string[];
      };
    }>;
    total: number;
  };
  pagination: number;
  pages: number;
  query: string;
  isLoading: boolean;
}

export const useStore = defineStore({
  // State:

  id: 'store',
  state: (): StoreState => ({
    packagesSearchResult: {
      objects: [],
      total: 0
    },
    pagination: 1,
    pages: 0,
    isLoading: false,
    query: ''
  }),

  // Actions:

  actions: {
    async searchPackages(query: string) {
      this.isLoading = true;
      const size = 10;
      const from = this.pagination === 0 ? 0 : (this.pagination - 1) * size;

      try {
        const response = await apiGetSearch({ text: query, size, from });
        this.packagesSearchResult = response;
        this.setPagesQuantity();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    setPageNumber(pageNumber: number): void {
      if (pageNumber !== this.pagination) {
        this.pagination = pageNumber;
        this.searchPackages(this.query);
      }
    },
    setPagesQuantity(): void {
      this.pages = Math.round(this.packagesSearchResult.total / 10);
    },
    updateQuery(query: string): void {
      this.query = query;
      this.searchPackages(query);
    },

    resetSearchResults() {
      this.packagesSearchResult = {
        objects: [],
        total: 0
      };
      this.pagination = 1;
    }
  },
  // Getters:

  getters: {
    getPackagesSearchResult: (state: StoreState) =>
      state.packagesSearchResult.objects,
    getTotalPackages: (state: StoreState) => state.packagesSearchResult.total,
    getIsLoading: (state: StoreState) => state.isLoading
  }
});
