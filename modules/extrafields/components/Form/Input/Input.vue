<template>
  <a-form-item>
    <label v-if="rule.title" v-html="rule.title"> </label>
    <a-input
      :type="rule.props.type"
      :initialValue="rule.value"
      class="form-field"
      :placeholder="rule.placeholder"
      :class="rule.className"
      :disabled="rule.disabled"
      v-decorator="[
        `field-${_uid}`,
        {
          rules: decorator,
        },
      ]"
      @input="useInputText"
    >
      <a-icon slot="addonAfter" type="setting" v-if="config" @click="useOpenConfig" />
      <a-icon
        slot="addonAfter"
        type="delete"
        v-if="config"
        style="padding-left: 5px; margin-left: 5px"
        @click="useDeleteField"
      />
    </a-input>
    <config :rule="rule" :open="configField" v-if="configField && config" v-on:closePannel="configField = false" />
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api';
import { useExtrafieldsStore } from '@EXTRAFIELDS/stores/useStore';
import config from './config.vue';

export default defineComponent({
  components: {
    config,
  },
  setup(props) {
    const configField: any = ref<boolean>(false);
    const decorator: any = ref([]);
    const store = useExtrafieldsStore();

    const useOpenConfig = () => {
      configField.value = !configField.value;
    };
    const useDeleteField = () => {
      store.useDeleteField(props.rule.id);
    };

    const useInputText = (e: any) => {
      if (!props.config) {
        let o = Object.assign({}, props.rule);
        o.value = e.target.value;
        store.useUpdateField(o);
      }
    };
    onMounted(() => {
      if (!props.config) {
        let r: any = props.rule;
        decorator.value = r.validate;
      }
    });
    return {
      configField,
      decorator,
      useOpenConfig,
      useInputText,
      useDeleteField,
    };
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
  },
});
</script>
<style lang="scss" scoped>
.form-field {
  .fields-pannel & {
    cursor: move;
  }
}
.form-item {
  margin-right: 7px;
}
</style>
