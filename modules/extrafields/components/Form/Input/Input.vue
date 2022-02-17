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
      @input="inputText"
    >
      <a-icon
        slot="addonAfter"
        type="setting"
        v-if="config"
        @click="openConfig"
      />
      <a-icon
        slot="addonAfter"
        type="delete"
        v-if="config"
        style="padding-left: 5px; margin-left: 5px"
        @click="deleteField"
      />
    </a-input>
    <config
      :rule="rule"
      :open="configField"
      v-if="configField && config"
      v-on:closePannel="configField = false"
    />
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import config from "./config.vue";

export default defineComponent({
  components: {
    config,
  },
  setup() {},
  data() {
    return {
      configField: false,
      decorator: [],
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
    if (!this.config) {
      this.decorator = this.rule.validate;
    }
  },
  methods: {
    openConfig() {
      this.configField = !this.configField;
    },
    deleteField() {
      this.$store.dispatch("extrafields/deleteField", this.rule.id);
    },
    inputText(e: any) {
      if (!this.config) {
        let o = Object.assign({}, this.rule);
        o.value = e.target.value;
        this.$store.dispatch("extrafields/updateField", o);
      }
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
