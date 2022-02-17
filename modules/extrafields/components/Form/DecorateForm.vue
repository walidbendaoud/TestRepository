<template>
  <Input
    :rule="rule"
    v-if="rule.type == 'input'"
    :config="config"
    class="form-item"
    :class="{'config-item':config}"
  />
  <Select
    :rule="rule"
    v-else-if="rule.type == 'select'"
    :config="config"
    class="form-item"
    :class="{'config-item':config}"
  />
  <Button
    :rule="rule"
    v-else-if="rule.type == 'button'"
    :config="config"
    class="form-item"
    :class="{'config-item':config}"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api";

import Input from "./Input/Input.vue";
import Button from "./Button/Button.vue";
import Select from "./Select/Select.vue";

export default defineComponent({
  components: {
    Input,
    Button,
    Select,
  },
  setup() {
    const collapse:any = ref<Boolean>(false);

    return {
      collapse
    }
  },
  props: {
    option: {
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
  }
});
</script>
<style lang="scss">
.ant-select{
  .ant-drawer &{
    width: 100%;
  }
}
</style>