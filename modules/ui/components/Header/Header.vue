<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon
      class="trigger"
      :type="collapse ? 'menu-unfold' : 'menu-fold'"
      @click="() => {collapse = !collapse; $emit('collapse-menu', collapse)}"
    />
  </a-layout-header>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    
  },
  data() {
    return {
      collapse: false,
    };
  },
  props: {
    collapsed: {
      type: Boolean,
      default: () => false,
    },
  }
})
</script>
