<template>
  <tr>
    <td class="package-table__body-td name">{{ item?.name }}</td>
    <td class="package-table__body-td version">{{ item?.version }}</td>
    <td class="package-table__body-td desc">{{ item?.description }}</td>
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
