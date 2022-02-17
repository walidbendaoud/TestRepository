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
      
      <a-button type="primary" @click="check">Save</a-button>
    </a-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
const FormProduct = () => import("@PRODUCT/components/Form.vue");
const FormService = () => import ("@PRODUCT/components/Service.vue");

export default Vue.extend({
  components: {
    FormProduct,
    FormService
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
      option: { config: false },
    };
  },
  methods: {
    check() {
      this.form.validateFields((err) => {
        if (!err) {
          console.info("success");
        }
      });
    },
  },
});
</script>
