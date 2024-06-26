<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-content">
        <h3 class="modal-name">{{ currentPackage?.name }}</h3>
        <p class="modal-type">Type: {{ currentPackage?.type }}</p>
        <div class="modal-tags">
          <span>Tags:</span>
          <div class="modal-tags__container">
            <span
              v-for="(version, tag) in currentPackage?.tags"
              :key="tag"
              @click="getEntry(currentPackage?.name, version)"
            >
              {{ tag }}: {{ version }}
            </span>
          </div>
        </div>
      </div>
      <div class="modal-entrypoints" v-if="currentEntryPointsExist">
        <p class="modal-entrypoins__title">Entrypoints:</p>
        <div
          v-for="(entryPoint, key) in links"
          :key="key"
          class="input-group flex-nowrap mb-2"
        >
          <label
            :for="entryPoint"
            class="input-group-text"
            style="min-width: 50px"
          >
            {{ key }}:
          </label>
          <input
            type="text"
            class="form-control"
            :value="entryPoint"
            @focus="handleFocus($event)"
          />
        </div>
      </div>
      <a
        target="_blank"
        class="modal-links"
        v-for="(link, name) in currentPackage?.links"
        :key="name"
        :href="link"
      >
        {{ name }}
      </a>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store/index';

export default defineComponent({
  data() {
    return {
      links: {}
    };
  },
  computed: {
    store(): ReturnType<typeof useStore> {
      return useStore();
    },
    currentPackage() {
      return useStore().getCurrentPackage;
    },
    entryPoints() {
      return useStore().getCurrentEntryPoints.entrypoints;
    },
    currentEntryPointsExist(): boolean {
      return Object.keys(this.links).length > 0;
    }
  },

  methods: {
    handleFocus(event: FocusEvent) {
      const inputElement = event.target as HTMLInputElement;
      inputElement.select();
    },

    closeModal() {
      this.store.showHideModal(false);
    },
    currentEntryPoints(name: string, version: string) {
      const baseUrl = 'https://cdn.jsdelivr.net/npm/';
      const parsedObject: { [key: string]: string } = {};

      for (const key in this.entryPoints) {
        parsedObject[
          key
        ] = `${baseUrl}${name}@${version}${this.entryPoints[key].file}`;
      }

      this.links = parsedObject;
    },
    async getEntry(name: string, version: string) {
      await this.store.getVersionEntryPoint(name, version);

      this.currentEntryPoints(name, version);
    }
  }
});
</script>
