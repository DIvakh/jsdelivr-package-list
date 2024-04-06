<template>
  <input
    class="form-control"
    placeholder="Search npm (min. 2 symbols length)"
    type="text"
    @input="debounceChangeQuery"
  />
  <div v-if="showErrorMessage" class="error-message">
    Search query is to short
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { debounce } from '../utils/debounce';

export default defineComponent({
  data() {
    return {
      showErrorMessage: false
    };
  },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.debounceChangeQuery = debounce((event: InputEvent) => {
      const value = (event.target as HTMLInputElement).value;
      this.changeQuery(value);
    }, 1000);
  },
  methods: {
    debounceChangeQuery(event: InputEvent): void {
      this.debounceChangeQuery(event);
    },
    changeQuery(value: string): void {
      if (value.length > 2) {
        this.showErrorMessage = false;
        this.$emit('changeQuery', value);
      } else {
        this.showErrorMessage = true;
      }
    }
  },
  emits: {
    changeQuery: (value: string) => value.length
  }
});
</script>
