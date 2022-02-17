<template>
  <DefaultLayout>
    <nuxt />
  </DefaultLayout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import DefaultLayout from '~/modules/ui/layouts/collapsable'

export default defineComponent({
  components: {
    DefaultLayout
  },
  setup () {
    //
  }
})
</script>
<style scoped>
.d-flex {
  display: flex;
}
.ant-form-item-label {
  white-space: break-spaces;
  line-height: 1.5;
  padding-right: 10px;
}
</style>
