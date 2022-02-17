<template>
  <div>
    ==>add
    <a-row type="flex" justify="end">
      <a-button type="primary" @click="$root.$emit('drawer',true)"> Open Fields Pannel </a-button>
    </a-row>

    <extrafields-builder/>

    <a-form :form="form" class="build-form">
      <form-product :option="option"/>
      <a-button type="primary" @click="useSave">Save form configuration</a-button>
    </a-form>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from '@nuxtjs/composition-api'
import ExtrafieldsBuilder from "@EXTRAFIELDS/components/Form/ExtrafieldsBuilder.vue";
import FormProduct from "@PRODUCT/components/Form.vue";
import { useExtrafieldsStore } from '@EXTRAFIELDS/stores/useStore';

export default defineComponent({
  components: {
    ExtrafieldsBuilder,
    FormProduct,
  },
  setup(){
    const instance:any = getCurrentInstance();
    const store:any = useExtrafieldsStore();
    const option:any = ref<Object>({
      dragging: true,
      config:true,
    });

    const useSave= () =>{
      instance.proxy.form.validateFields((err:any) => {
        if (!err) {
          console.info("success");
        }else{
          console.log(err)
        }
      });
      store.useSaveFields()
    }
    return {
      option,
      useSave
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
    };
  },
});
</script>
<style lang="scss">
.build-form {
  .ant-input[disabled],
  .ant-select-disabled .ant-select-selection {
    color: rgba(0, 0, 0, 0.25);
    background-color: white;
    cursor: not-allowed;
    opacity: 1;
    cursor: move;
  }
}
</style>
