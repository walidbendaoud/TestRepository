<template>
  <div>
    <nuxt-link :to="localePath('/product')">
      <a-button-group>
        <a-button type="primary"> <a-icon type="left" />Go back </a-button>
      </a-button-group>
    </nuxt-link>
    <a-form :form="form" class="build-form">
      <form-product :option="option" v-if="true"/>
      <form-service :option="option" v-if="false"/>      
      <a-button type="primary" @click="useCheck">Save</a-button>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from '@nuxtjs/composition-api'
const FormProduct = () => import("@PRODUCT/components/Form.vue");
const FormService = () => import ("@PRODUCT/components/Service.vue");

export default defineComponent({
  components: {
    FormProduct,
    FormService
  },
  setup() {
    const instance:any = getCurrentInstance();
    const option = ref({config: false});
    
    const useCheck = () =>{
      instance.proxy.form.validateFields((err:any) => {
        if (!err) {
          console.info("success");
        }
      });
    }
    return {
      option,
      useCheck
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
    };
  },
})
</script>
