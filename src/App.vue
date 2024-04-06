<template>
  <AppHeader :query="query" @change-query="changeQuery" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/AppHeader.vue';
import { useStore } from './store/index';
const store = useStore();

interface State {
  query: string;
}

export default defineComponent({
  components: { AppHeader },
  data(): State {
    return {
      query: ''
    };
  },
  methods: {
    changeQuery(query: string) {
      this.query = query;
      console.log(query);
    }
  }
});
</script>
./store
