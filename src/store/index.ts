import { defineStore } from 'pinia';
import {
  apiGetSearch,
  apiGetPackage,
  apiGetPackageEntryPoints
} from '../services/package';
import StoreState from '../types/StoreState';
import SearchParams from '@/types/SearchParams';

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
    query: '',
    isShowModal: false,
    currentPackage: null,
    entryPoints: null
  }),

  // Actions:

  actions: {
    async searchPackages(query: string) {
      this.isLoading = true;
      this.showHideModal(false);
      const size = 10;
      const from = this.pagination === 0 ? 0 : (this.pagination - 1) * size;

      try {
        const response = await apiGetSearch({
          text: query,
          size: `${size}`,
          from: `${from}`
        });

        this.packagesSearchResult = response;
        this.setPagesQuantity();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getCurrentPackageInfo(name: string) {
      try {
        const response = await apiGetPackage(name);
        this.currentPackage = response;
        console.log(response);
        this.showHideModal(true);
      } catch (error) {
        console.error(error);
      }
    },

    async getVersionEntryPoint(name: string, version: string) {
      try {
        const response = await apiGetPackageEntryPoints(name, version);
        this.entryPoints = response;
        console.log(response);
      } catch (error) {
        console.error(error);
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
      if (query.length >= 2) {
        this.searchPackages(query);
      } else {
        this.resetSearchResults();
      }
    },

    resetSearchResults() {
      this.packagesSearchResult = {
        objects: [],
        total: 0
      };
      this.pagination = 1;
      this.showHideModal(false);
    },
    showHideModal(action: boolean): void {
      this.isShowModal = action;
    }
  },
  // Getters:

  getters: {
    getPackagesSearchResult: (state: StoreState) =>
      state.packagesSearchResult.objects,
    getTotalPackages: (state: StoreState) => state.packagesSearchResult.total,
    getIsLoading: (state: StoreState) => state.isLoading,
    getIsShowModal: (state: StoreState) => state.isShowModal,
    getCurrentPackage: (state: StoreState) => state.currentPackage,
    getCurrentEntryPoints: (state: StoreState) => state.entryPoints,
    getSearchParams: (state: StoreState): SearchParams => {
      return {
        query: state.query,
        pagination: state.pagination,
        isShowModal: state.isShowModal,
        currentPackageName: state.currentPackage?.name
      };
    },
    getSearchQuery: (state: StoreState) => state.query
  }
});
