<template>
  <a-form-item>
    <label v-if="rule.title" v-html="rule.title"> </label>
    <div style="display: flex">
      <a-select
        class="form-field"
        :class="rule.className"
        :initial-value="
          rule.options.find((e) => e.selected == true)
            ? rule.options.find((e) => e.selected == true).va
            : ''
        "
        :disabled="rule.disabled"
        :mode="rule.multiple ? 'multiple' : 'default'"
        v-decorator="[
          `field-${_uid}`,
          {
            rules: decorator
          },
        ]"
      >
        <a-select-option
          :value="o.value"
          v-for="(o, i) in rule.options.filter(
            (i) => i.key !== '' && !rule.source
          )"
          :key="'opt' + i"
        >
          {{ o.value }}
        </a-select-option>
        <a-select-option
          :value="o.value"
          v-for="(o, i) in rule.asyncOptions.filter(
            (i) => i.key && rule.source && !config
          )"
          :key="'opt' + i"
        >
          {{ o.value }}
        </a-select-option>
      </a-select>
      <button class="ant-input-group-addon" v-if="config">
        <a-icon type="setting" @click="openConfig" />
        <a-icon type="delete" class="delete" @click="deleteField" />
      </button>
    </div>
    <config
      :rule="rule"
      :open="configField"
      v-if="configField && config"
      v-on:closePannel="onSetConfig()"
    />
  </a-form-item>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import config from "./config.vue";

export default defineComponent({
  setup() {},
  components: {
    config,
  },
  data() {
    return {
      configField: false,
      decorator:[]
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
  mounted() {
    this.getSelectData();
    if (!this.config) {
      this.decorator = this.rule.validate;
    }
  },
  methods: {
    getSelectData() {
      if (this.rule.source && !this.config) {
        let $settings = Object.assign({}, this.rule);
        $settings.source = this.rule.source;
        let $this = this;
        this.$store.dispatch("extrafields/getData", {
          $settings,
          onSuccess(o: any) {
            $this.$store.commit(`extrafields/updateField`, o);
          },
          onError(e: any) {
            console.log(e);
          },
        });
      }
    },
    openConfig() {
      this.configField = !this.configField;
    },
    deleteField() {
      this.$store.dispatch("extrafields/deleteField", this.rule.id);
    },
    onSetConfig() {
      this.configField = false;
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
