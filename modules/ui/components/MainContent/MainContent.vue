<template>
  <a-layout-content class="main-content">
    <slot />
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss">
.main-content {
  background: white;
  min-height: calc(100vh - 112px);
  margin: 24px 16px;
  padding: 24px;
}
</style>
