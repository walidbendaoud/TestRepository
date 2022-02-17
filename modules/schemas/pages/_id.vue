<template>
  <div>
    <a-row type="flex" justify="end">
      <a-button type="primary" @click="$root.$emit('drawer',true)"> Open Fields Pannel </a-button>
    </a-row>

    <extrafields-builder/>

    <a-form :form="form" class="build-form">
      <form-product :option="option"/>
      <a-button type="primary" @click="save">Save form configuration</a-button>
    </a-form>

  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ExtrafieldsBuilder from "@EXTRAFIELDS/components/Form/ExtrafieldsBuilder.vue";
import FormProduct from "@PRODUCT/components/Form.vue";

export default defineComponent({
  components: {
    ExtrafieldsBuilder,
    FormProduct,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
      option: {
        dragging: true,
        config:true,
      },
    };
  },
  methods: {
    save() {
      this.form.validateFields((err) => {
        if (!err) {
          console.info("success");
        }else{
          console.log(err)
        }
      });
      this.$store.dispatch('extrafields/saveFields')
    },
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
