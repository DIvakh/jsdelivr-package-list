<template>
  <AppHeader />
  <main>
    <AppTable />
  </main>
  <AppFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppTable from './components/AppTable.vue';
import { useStore } from './store/index';
import SearchParams from './types/SearchParams';
import AppFooter from './components/AppFooter.vue';

export default defineComponent({
  components: { AppHeader, AppTable, AppFooter },
  computed: {
    store() {
      return useStore();
    },
    searchParams(): SearchParams {
      return this.store.getSearchParams;
    }
  },
  methods: {
    updateSearchParams(newSearchParams: SearchParams): void {
      const urlSearchParams = new URLSearchParams();

      if (newSearchParams.query.length >= 2) {
        urlSearchParams.set('query', newSearchParams.query);
        urlSearchParams.set('page', newSearchParams.pagination.toString());

        if (newSearchParams.isShowModal) {
          urlSearchParams.set('modal', newSearchParams.isShowModal.toString());
        }

        if (newSearchParams.currentPackageName) {
          urlSearchParams.set('package', newSearchParams.currentPackageName);
        }
      }

      const queryString = urlSearchParams.toString();
      const url =
        window.location.origin + window.location.pathname + '?' + queryString;

      window.history.replaceState(null, '', url);
    },
    handleMount(): void {
      const urlSearchParams = new URLSearchParams(window.location.search);

      const query: string | null = urlSearchParams.get('query');
      const page: string | null = urlSearchParams.get('page');
      const isShowModalParam: string | null = urlSearchParams.get('modal');
      const currentPackageName: string | null = urlSearchParams.get('package');

      if (query && page) {
        const pageNumber: number = parseInt(page, 10);
        if (!isNaN(pageNumber)) {
          this.store.updateQuery(query);
          this.store.setPageNumber(pageNumber);
        }
      }

      if (isShowModalParam === 'true' && currentPackageName) {
        this.store.getCurrentPackageInfo(currentPackageName);
      }
    }
  },
  mounted(): void {
    this.handleMount();
  },
  watch: {
    searchParams: {
      handler: 'updateSearchParams',
      deep: true
    }
  }
});
</script>
