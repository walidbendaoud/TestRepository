<template>
  <DefaultLayout>
    <nuxt />
  </DefaultLayout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import DefaultLayout from '~/modules/ui/layouts/collapsable'

export default defineComponent({
  setup() {
    //
  },
  components:{
    DefaultLayout
  }
})
</script>
