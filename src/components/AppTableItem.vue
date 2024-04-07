<template>
  <tr>
    <td>{{ item?.name }}</td>
    <td>{{ item?.version }}</td>
    <td>{{ item?.description }}</td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    item: Object
  }
});
</script>
