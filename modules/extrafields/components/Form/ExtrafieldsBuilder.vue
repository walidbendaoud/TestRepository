

<template>
  <div v-if="list2">
    <a-drawer
      title="Form elements"
      class="fields-pannel"
      placement="left"
      :closable="true"
      :visible="openDrawer"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      :mask="false"
    >
      <draggable
        class="dragArea list-group"
        :list="list2"
        :move="checkMove"
        :clone="cloneObject"
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
import { defineComponent } from "@vue/composition-api";
import draggable from "vuedraggable";
import DecorateForm from "./DecorateForm.vue";

export default defineComponent({
  components: {
    draggable,
    DecorateForm,
  },
  data() {
    return {
      collapse: false,
      openDrawer:false,
      list2: [],
      list1: [
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
      ],
    };
  },
  beforeDestroy(){
    this.$root.$off('drawer')
  },
  mounted() {
    let $this= this
    this.$root.$on('drawer', function(e:any){
      $this.openDrawer=e
    })
    this.list2 = JSON.parse(JSON.stringify(this.list1));
  },
  methods: {
    checkMove(evt: any) {
      this.list2 = JSON.parse(JSON.stringify(this.list1));
      this.$root.$emit('drawer',false)
    },
    cloneObject(e: any) {
      let o = Object.assign({}, e);
      o.disabled = false;
      o.placeholder = "";
      return o;
    },
    afterVisibleChange(val: any) {
      //
    },
    onClose() {
      this.$root.$emit('drawer',false)
    },
  },
});
</script>