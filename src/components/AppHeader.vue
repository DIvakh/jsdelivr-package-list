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
import { defineComponent, ref } from 'vue';
import { useStore } from '../store/index';
import { debounce } from 'lodash';

export default defineComponent({
  setup() {
    const searchQuery = ref('');
    const store = useStore();
    const isSearchQueryTooShort = ref(false);

    const debouncedSearchQuery = debounce(() => {
      isSearchQueryTooShort.value = searchQuery.value.length < 2;
      if (!isSearchQueryTooShort.value) {
        store.updateQuery(searchQuery.value);
      } else {
        store.resetSearchResults();
      }
    }, 300);

    return {
      searchQuery,
      isSearchQueryTooShort,
      debouncedSearchQuery
    };
  }
});
</script>
