<template>
  <div class="filterMenu">
    <div data-toggle="buttons" class="btn-group btn-group-toggle">
      <div>
        <a-radio-group @change="useHandleFilter">
          <a-radio :value="2">
            {{ $t('all') }}
          </a-radio>
          <a-radio :value="true">
            {{ $t('predefined') }}
          </a-radio>
          <a-radio :value="false">
            {{ $t('personalized') }}
          </a-radio>
        </a-radio-group>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useTemplatesList } from '@TEMPLATE/composable/useTemplate'

export default defineComponent({
  setup () {
    const { useGetData } = useTemplatesList()
    const $route = useRoute()
    const isocode = $route.value.params.isocode

    const useHandleFilter = (e: any) => {
      if (e.target.value !== 2) {
        useGetData({ isocode, isPredefined: e.target.value })
      } else {
        useGetData({ isocode, isPredefined: '' })
      }
    }
    return {
      useHandleFilter
    }
  },
  head () {
    return {
      title: 'Template'
    }
  }
})
</script>
