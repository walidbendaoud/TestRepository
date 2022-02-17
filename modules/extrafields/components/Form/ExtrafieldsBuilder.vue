

<template>
  <div v-if="list2">
    <a-drawer
      title="Form elements"
      class="fields-pannel"
      placement="left"
      :closable="true"
      :visible="openDrawer"
      :after-visible-change="useAfterVisibleChange"
      @close="useOnClose"
      :mask="false"
    >
      <draggable
        class="dragArea list-group"
        :list="list2"
        :move="useCheckMove"
        :clone="useCloneObject"
        :group="{ name: 'fields', pull: 'clone', put: false }"
      >
        <div class="list-group-item" v-for="(element, i) in list2" :key="i">
          <decorate-form :rule="element" :key="'r'+element.id" />
        </div>
      </draggable>
    </a-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, getCurrentInstance, onMounted, onBeforeUnmount } from "@nuxtjs/composition-api";
import draggable from "vuedraggable";
import DecorateForm from "./DecorateForm.vue";

export default defineComponent({
  components: {
    draggable,
    DecorateForm,
  },
  setup(){
    const instance:any = getCurrentInstance();
    const collapse:any = ref<Boolean>(false);
    const openDrawer = ref<Boolean>(false);
    const list2:any = ref<{}[]>([]);
    const list1:any = ref<{}[]>( [
        {
          name: "",
          type: "input",
          field: "",
          value: "",
          placeholder: "Input text",
          disabled: true,
          props: {
            type: "text",
          },
        },
        {
          name: "",
          type: "select",
          field: "",
          value: "",
          placeholder: "Select box",
          disabled: true,
          multiple: false,
          options: [],
          asyncOptions:[]
        },
      ]
    );

    const useCheckMove = (evt: any) => {
      list2.value = JSON.parse(JSON.stringify(list1.value));
      instance.proxy.$root.$emit('drawer',false)
    }

    const useCloneObject = (e: any) => {
      let o = Object.assign({}, e);
      o.disabled = false;
      o.placeholder = "";
      return o;
    }

    const useAfterVisibleChange = (val: any) =>{
       //
    }

    const useOnClose = () => {
      instance.proxy.$root.$emit('drawer',false)
    }

    onMounted(()=>{
      instance.proxy.$root.$on('drawer', function(e:any){
        openDrawer.value=e
      })
      list2.value = JSON.parse(JSON.stringify(list1.value));
    })
    onBeforeUnmount(()=>{
      instance.proxy.$root.$off('drawer')
    })

    return {
      collapse,
      openDrawer,
      useAfterVisibleChange,
      useOnClose,
      useCloneObject,
      useCheckMove,
      list2,
      list1
    }
  }
});
</script>