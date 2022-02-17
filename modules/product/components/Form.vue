<template>
  <div>
    <a-tabs @tabClick="setCurrentTab">
      <a-tab-pane tab="Tab1" :forceRender="true" key="0">
        <label>Name</label>
        <a-input type="text" label="Name" style="margin-top: 7px"></a-input>
        <extrafields-form :option="option" :tab="0" />
      </a-tab-pane>
      <a-tab-pane tab="Tab2" :forceRender="true" key="1">
        <extrafields-form :option="option" :tab="1" />
      </a-tab-pane>
      <a-tab-pane tab="Tab3" :forceRender="true" key="3">
        <extrafields-form :option="option" :tab="3" />
      </a-tab-pane>
    </a-tabs>
    {{ form }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import DecorateForm from "@EXTRAFIELDS/components/Form/DecorateForm";
import draggable from "vuedraggable";
import ExtrafieldsForm from "@EXTRAFIELDS/components/Form/ExtrafieldsForm.vue";

export default defineComponent({
  fetch() {
    this.$store.dispatch("extrafields/getForm", "product");
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  components: {
    draggable,
    DecorateForm,
    ExtrafieldsForm,
  },
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    form: {
      get(): any {
        return this.$store.state.extrafields.form;
      },
      set(value: any) {
        this.$store.commit("extrafields/updateForm", value);
      },
    },
  },
  methods: {
    handleChange(e: any) {
      console.log("changed", e);
    },
    inputChanged(value: any) {
      console.log("input", value);
    },
    getComponentData() {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged,
        },
      };
    },
    change(e: any) {
      if (e.added) {
        if (this.option.tabs) {
          this.$store.commit("extrafields/updateField", {
            tab: this.activeTab,
            id: e.added.element.id,
          });
        }
      }
    },
    setCurrentTab(activeKey: any) {
      this.activeTab = activeKey;
    },
    updateDrawer(e: any) {
      this.$root.$emit("drawer", e);
    },
  },
});
</script>
