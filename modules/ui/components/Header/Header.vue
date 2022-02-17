<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon
      class="trigger"
      :type="collapse ? 'menu-unfold' : 'menu-fold'"
      @click="
        () => {
          collapse = !collapse;
          $emit('collapse-menu', collapse);
        }
      "
    />
  </a-layout-header>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const collapse = ref<Boolean>(false);

    return { collapse };
  },
  props: {
    collapsed: {
      type: Boolean,
      default: () => false,
    },
  },
});
</script>
