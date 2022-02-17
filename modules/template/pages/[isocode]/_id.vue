<template>
  <div>
    <h1>{{ $t('editTemplate') }}</h1>
    <template-form />
  </div>
</template>

<script lang="ts">
// todo: add comments

import { defineComponent } from '@nuxtjs/composition-api'
import templateForm from '@TEMPLATE/components/Form.vue'

export default defineComponent({
  components: {
    templateForm
  },
  head () {
    return {
      title: this.$t('editTemplate')
    }
  }
})
</script>
<style scoped>
button {
  margin-right: 8px;
}
</style>
