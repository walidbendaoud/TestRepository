<template>
  <DefaultLayout>
    <nuxt />
  </DefaultLayout>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
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
