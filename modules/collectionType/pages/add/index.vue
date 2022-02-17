<template>
  <div>
    <h1>Add Collection Type</h1>
    <collection-form />
  </div>
</template>
<style scoped>
button {
  margin-right: 8px;
}
</style>

<script lang="ts">
// todo: add comments

import { defineComponent } from "@vue/composition-api";
import collectionForm from "@COLLECTIONTYPE/components/Form"

export default defineComponent({
  components: {
    collectionForm
  },
  head() {
    return {
      title: "Add Collection Type",
    };
  },
  data() {
    return {
      //
    };
  },
});
</script>