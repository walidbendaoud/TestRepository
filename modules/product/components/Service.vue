<template>
  <div>
    <a-tabs @tabClick="useSetCurrentTab">
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
import { defineComponent, getCurrentInstance, computed, ref } from "@nuxtjs/composition-api";
import ExtrafieldsForm from "@EXTRAFIELDS/components/Form/ExtrafieldsForm.vue";
import { useExtrafieldsStore } from '@EXTRAFIELDS/stores/useStore';

export default defineComponent({
  components: {
    ExtrafieldsForm,
  },
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  setup(){
    const activeTab = ref<number>(0)
    const store = useExtrafieldsStore()

    const useSetCurrentTab = (activeKey: any) => {
      activeTab.value = activeKey;
    }

    const form:any = computed({
      get () {
        return store.form;
      },
      set(value:any) {
        store.useUpdateForm(value);
      }
    })

    return {
      useSetCurrentTab,
      form,      
      activeTab
    }
  }
});
</script>
