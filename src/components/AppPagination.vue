<template>
  <button @click="decreasePageNumber" :disabled="selectedPage === 1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="8"
      viewBox="0 0 9 8"
      fill="none"
    >
      <path
        d="M5.5 1.36914e-07L1.5 4L5.5 8.00001L5.5 1.36914e-07Z"
        fill="#818181"
      />
    </svg>
  </button>
  <select v-model="selectedPage">
    <option v-for="page in pageCount" :key="page" :value="page">
      {{ page }}
    </option>
  </select>
  <button @click="increasePageNumber" :disabled="selectedPage === pages">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="8"
      viewBox="0 0 9 8"
      fill="none"
    >
      <path d="M3.5 8L7.5 4L3.5 -4.92071e-06L3.5 8Z" fill="#818181" />
    </svg>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store/index';
interface State {
  selectedPage: number;
  pageCount: number[];
}
export default defineComponent({
  data(): State {
    return {
      pageCount: [],
      selectedPage: 1
    };
  },
  computed: {
    store() {
      return useStore();
    },
    pages() {
      return useStore().pages;
    },
    pagination() {
      return useStore().pagination;
    }
  },

  watch: {
    pages: function (): void {
      this.countPages();
    },
    selectedPage: function (newVal): void {
      this.updatePageNumber(newVal);
    }
  },
  mounted(): void {
    this.countPages();
    this.updatePageNumber(this.selectedPage);
  },
  methods: {
    countPages(): void {
      this.pageCount = Array.from(
        { length: this.pages },
        (_, index) => index + 1
      );

      this.selectedPage = this.pagination;
    },
    updatePageNumber(pageNumber: number) {
      this.store.setPageNumber(pageNumber);
    },
    decreasePageNumber(): void {
      this.selectedPage--;
      if (this.selectedPage < 1) {
        this.selectedPage = 1;
      }
    },
    increasePageNumber(): void {
      this.selectedPage++;
      if (this.selectedPage > this.pageCount.length) {
        this.selectedPage = this.pageCount.length;
      }
    }
  }
});
</script>
