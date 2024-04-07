<template>
  <div>
    <div class="table-container" v-if="!store.getIsLoading">
      <table v-if="packages.length" class="package-table">
        <thead class="package-table__head">
          <tr class="package-table__row">
            <th class="package-table__cell">Name</th>
            <th class="package-table__cell">Description</th>
            <th class="package-table__cell">Key words</th>
          </tr>
        </thead>
        <tbody class="package-table__body">
          <AppTableItem
            v-for="(item, index) in packages"
            :key="index"
            :item="item.package"
          />
        </tbody>
      </table>
      <div class="not-found" v-else>
        <h2 class="packageNotFound__title">Package not found...</h2>
        <p class="packageNotFound__description">
          Please, input or change your request in text field
        </p>
      </div>
      <AppPagination v-if="packages.length" />
    </div>
    <AppSpinner v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store/index';
import AppTableItem from './AppTableItem.vue';
import AppPagination from './AppPagination.vue';
import AppSpinner from './AppSpinner.vue';

export default defineComponent({
  components: { AppTableItem, AppPagination, AppSpinner },
  computed: {
    store(): ReturnType<typeof useStore> {
      return useStore();
    },
    packages() {
      return useStore().getPackagesSearchResult;
    }
  }
});
</script>
