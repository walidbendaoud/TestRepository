<template>
  <a-input :placeholder="$t('search')" class="input" @change="useHandleKeyChange" />
</template>
<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useTemplatesList } from '@TEMPLATE/composable/useTemplate'

export default defineComponent({
  setup () {
    const { useGetData } = useTemplatesList()
    const $route = useRoute()
    const isocode = $route.value.params.isocode

    const useHandleKeyChange = (e: any) => {
      useGetData({ isocode, key: e.target.value })
    }
    return {
      useHandleKeyChange
    }
  },
  head () {
    return {
      title: 'Template'
    }
  }
})
</script>
<style scoped>
.inputForm input {
  max-width: 300px;
  margin-left: 20px;
}
</style>
