<template>
  <div
    :class="{ 'dragArea list-group ant-upload ant-upload-drag': option.config }"
  >
    <draggable
      :disabled="!option.dragging"
      v-model="form"
      :component-data="useComponentData()"
      ghost-class="ghost"
      class="draggable-area"
      v-bind="{ handle: '.form-item' }"
      group="fields"
      @change="useOnChange"
      :clone="useOnMove"
    >
      <div v-for="(r, i) in form" :key="'rule' + i">
        <div v-if="r.tab == activeTab">
          <DecorateForm :rule="r" :config="option.config" :key="'r'+r.id" />
        </div>
      </div>

      <div class="empty-fields" v-if="option.config">
        <a-empty
          v-if="form.findIndex((e) => e.tab === activeTab) == -1"
          :imageStyle="{ height: '60px' }"
          class="no-data"
        />
        <a-button type="primary" class="btn" @click="useOpenDrawer">Add Field</a-button>
      </div>
    </draggable>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, onMounted, computed } from "@nuxtjs/composition-api";
import DecorateForm from "./DecorateForm.vue";
import { useExtrafieldsStore } from '@EXTRAFIELDS/stores/useStore';
import draggable from "vuedraggable";

export default defineComponent({
  components: {
    DecorateForm,
    draggable,
  },
  props: {
    option: {
      type: Object,
      default: () => {},
    },
    tab: {
      type: Number,
      default: () => 0,
    },
  },
  setup(props){
    const instance:any = getCurrentInstance()
    const store:any = useExtrafieldsStore()
    const dragging:any = ref<boolean>(false)
    const collapse:any = ref<boolean>(false)
    const activeTab:any = ref<number>(1)

    const useHandleChange = (e: any) => {
      //
    }
    const useInputChanged = (value: any) => {
      //
    }
    const useComponentData:any = () => {
      return {
        on: {
          change: useHandleChange,
          input: useInputChanged,
        },
      };
    }
    const useOnChange:any = (e:any) => {
      if (e.added) {
        store.useUpdateField({
          tab: activeTab.value,
          id: e.added.element.id,
        });
      }
    }
    const useOnMove:any = (e: any) => {
      // console.log("start", e);
    }
    const useOpenDrawer:any = (e: any) => {
      instance.proxy.$root.$emit("drawer", true);
    }
    const form:any = computed({
      get () {
        return store.form;
      },
      set(value:any) {
        store.useUpdateForm(value);
      }
    })

    onMounted(()=>{
      activeTab.value = props.tab;
    })

    return {
      useOpenDrawer,
      useComponentData,
      useOnMove,
      useOnChange,
      dragging,
      collapse,
      activeTab,
      form
    }
  }
});
</script>

<style lang="scss" scoped>
.dragArea {
  height: auto;
  margin: 15px 0;
  text-align: left;
  .draggable-area {
    min-height: 80px;
    padding:15px;
  }
}
.empty-fields {
  text-align: center;
  button {
    margin-top: 10px;
  }
}

.no-data {
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  &+.btn{
    margin-top: 90px;
  }
}
</style>

