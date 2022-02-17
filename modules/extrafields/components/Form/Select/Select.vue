<template>
  <a-form-item>
    <label v-if="rule.title" v-html="rule.title"> </label>
    <div style="display: flex">
      <a-select
        class="form-field"
        :class="rule.className"
        :initial-value="
          rule.options.find((e) => e.selected == true) ? rule.options.find((e) => e.selected == true).va : ''
        "
        :disabled="rule.disabled"
        :mode="rule.multiple ? 'multiple' : 'default'"
        v-decorator="[
          `field-${_uid}`,
          {
            rules: decorator,
          },
        ]"
      >
        <a-select-option
          :value="o.value"
          v-for="(o, i) in rule.options.filter((i) => i.key !== '' && !rule.source)"
          :key="'opt' + i"
        >
          {{ o.value }}
        </a-select-option>
        <a-select-option
          :value="o.value"
          v-for="(o, i) in rule.asyncOptions.filter((i) => i.key && rule.source && !config)"
          :key="'opt' + i"
        >
          {{ o.value }}
        </a-select-option>
      </a-select>
      <button class="ant-input-group-addon" v-if="config">
        <a-icon type="setting" @click="useOpenConfig" />
        <a-icon type="delete" class="delete" @click="useDeleteField" />
      </button>
    </div>
    <config :rule="rule" :open="configField" v-if="configField && config" v-on:closePannel="useOnSetConfig()" />
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api';
import config from './config.vue';
import { useExtrafieldsStore } from '@EXTRAFIELDS/stores/useStore';

export default defineComponent({
  setup(props) {
    const store = useExtrafieldsStore();
    const configField: any = ref<boolean>(false);
    const decorator: any = ref([]);

    onMounted(() => {
      useGetSelectData();
      if (!props.config) {
        let r: any = props.rule;
        decorator.value = r.validate;
      }
    });

    const useGetSelectData = async () => {
      if (props.rule.source && !props.config) {
        let $settings:any = Object.assign({}, props.rule);

        const response: any = await fetch(props.rule.source, { headers: { 'Content-type': 'application/json' } });
        let res = await response.json();
        if (res) {
          $settings.asyncOptions = res;
          store.useUpdateField($settings);
        }
      }
    };

    const useOpenConfig = () => {
      configField.value = !configField.value;
    };

    const useDeleteField = () => {
      store.useDeleteField(props.rule.id);
    };

    const useOnSetConfig = () => {
      configField.value = false;
    };

    return {
      configField,
      decorator,
      useOpenConfig,
      useDeleteField,
      useOnSetConfig,
    };
  },
  components: {
    config,
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
<style lang="scss">
.fields-pannel {
  .ant-select-selection {
    cursor: move;
  }
}
</style>
<style lang="scss" scoped>
.ant-input-group-addon {
  height: 32px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 60px;
}
.delete {
  margin-left: 7px;
}
</style>
