<template>
  <AppHeader />
  <AppTable />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppTable from './components/AppTable.vue';


export default defineComponent({
  components: { AppHeader, AppTable },
  data() {
    return {};
  }
});
</script>
