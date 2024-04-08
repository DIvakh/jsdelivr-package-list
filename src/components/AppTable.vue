<template>
  <section class="search-results">
    <div class="container">
      <div class="table-container" v-if="!store.getIsLoading">
        <table v-if="packages.length" class="package-table">
          <thead class="package-table__head">
            <tr class="package-table__row">
              <th class="package-table__cell name">Name</th>
              <th class="package-table__cell version">Version</th>
              <th class="package-table__cell desc">Description</th>
            </tr>
          </thead>
          <tbody class="package-table__body">
            <AppTableItem
              v-for="(item, index) in packages"
              :key="index"
              :item="item.package"
              @click="openModal(item.package.name)"
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
    <AppModal v-if="store.getIsShowModal" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store/index';
import AppTableItem from './AppTableItem.vue';
import AppPagination from './AppPagination.vue';
import AppSpinner from './AppSpinner.vue';
import AppModal from './AppModal.vue';

export default defineComponent({
  components: { AppTableItem, AppPagination, AppSpinner, AppModal },
  computed: {
    store(): ReturnType<typeof useStore> {
      return useStore();
    },
    packages() {
      return useStore().getPackagesSearchResult;
    }
  },
  methods: {
    openModal(packageName: string) {
      this.store.getCurrentPackageInfo(packageName);
    }
  }
});
</script>
