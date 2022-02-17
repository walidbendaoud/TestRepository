<template>
  <div>
    <h1>Add user</h1>

    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit.prevent="useHandleSubmit"
    >
      <a-form-item label="First Name">
        <a-input
          v-decorator="[
            'firstName',
            {
              rules: [{ required: true, message: 'Please input your first name!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Last Name">
        <a-input
          v-decorator="[
            'lastName',
            {
              rules: [{ required: true, message: 'Please input your last name!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="msisdn">
        <a-input
          v-decorator="[
            'msisdn',
            {
              rules: [{ required: true, message: 'Please input your msisdn!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="csid">
        <a-input
          v-decorator="[
            'csid',
            {
              rules: [{ required: true, message: 'Please input your customer id!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit"> Submit </a-button>
        <a-button html-type="button" @click="$router.push(localePath('test-users'))"> Cancel </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style scoped>
button {
  margin-right: 8px;
}
</style>

<script lang="ts">
// todo: add comments
import { defineComponent, onMounted, getCurrentInstance } from '@nuxtjs/composition-api';
import { useAdd } from '@USERS/composable/useUsers';

export default defineComponent({
  setup() {
    const instance: any = getCurrentInstance();
    
    // we used data cause wouldn't work properly as setup ref ==> to investigate
    //const form = ref(instance.proxy.$form.createForm(this, { name: 'coordinated' }));

    const useHandleSubmit = () => {
      instance.proxy.form.validateFields((err: any, values: any) => {
        if (!err) {
          useAdd();
        }
      });
    };

    onMounted(function () {
      //form,
      useAdd();
    });

    return {
      useHandleSubmit,
    };
  },
  head() {
    return {
      title: 'Users',
    };
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
});
</script>