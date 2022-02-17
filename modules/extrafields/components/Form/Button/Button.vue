<template>
  <a-form-item>
    <label v-if="rule.title" v-html="rule.title"> </label>
    (dev inprogess)
    <a-button
      :type="rule.props.type"
      :placeholder="rule.placeholder"
      :class="rule.className"
      :disabled="rule.disabled"
      @click="rule.click"
    >
      {{ rule.value }}
    </a-button>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const collapse = ref<Boolean>(false);
    return { collapse };
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    rule: {
      type: Object,
      default: () => {},
    },
    config: {
      type: Boolean,
      default: () => false,
    },
  },
});
</script>
