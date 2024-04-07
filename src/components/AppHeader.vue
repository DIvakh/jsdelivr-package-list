<template>
  <input
    class="form-control"
    placeholder="Search npm (min. 2 symbols length)"
    type="text"
    v-model="searchQuery"
    @input="debouncedSearchQuery"
  />
  <div v-if="isSearchQueryTooShort" class="error-message">
    Search query is too short
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, watch } from 'vue';
import { useStore } from '../store/index';
import { debounce } from 'lodash';

export default defineComponent({
  setup() {
    const searchQuery: Ref<string> = ref('');
    const store: ReturnType<typeof useStore> = useStore();
    console.log(store);

    const isSearchQueryTooShort: Ref<boolean> = ref(false);

    const debouncedSearchQuery = debounce((): void => {
      isSearchQueryTooShort.value = searchQuery.value.length < 2;
      if (!isSearchQueryTooShort.value) {
        store.updateQuery(searchQuery.value);
      } else {
        store.resetSearchResults();
      }
    }, 300);

    onMounted(() => {
      searchQuery.value = store.getSearchQuery;
    });

    watch(
      () => store.getSearchQuery,
      (newValue: string) => {
        searchQuery.value = newValue;
      }
    );

    return {
      searchQuery,
      isSearchQueryTooShort,
      debouncedSearchQuery
    };
  }
});
</script>
