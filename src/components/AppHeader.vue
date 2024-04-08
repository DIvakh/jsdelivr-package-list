<template>
  <header class="header">
    <div class="container">
      <div class="app-input">
        <input
          class="form-control"
          placeholder="Search npm (min. 2 symbols length)"
          type="text"
          v-model="searchQuery"
          @input="debouncedSearchQuery"
        />
      </div>
    </div>
  </header>
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
      store.updateQuery(searchQuery.value);
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
