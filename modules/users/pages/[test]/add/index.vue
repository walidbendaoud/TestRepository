<template>
  <div>
    <h1>Add user</h1>

    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit.prevent="handleSubmit"
    >
      <a-form-item label="First Name">
        <a-input
          v-decorator="[
            'firstName',
            {
              rules: [
                { required: true, message: 'Please input your first name!' },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Last Name">
        <a-input
          v-decorator="[
            'lastName',
            {
              rules: [
                { required: true, message: 'Please input your last name!' },
              ],
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
              rules: [
                { required: true, message: 'Please input your customer id!' },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit"> Submit </a-button>

        <a-button
          html-type="button"
          @click="$router.push(localePath('test-users'))"
        >
          Cancel
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style scoped>
button {
  margin-right: 8px;
}
</style>

<script>
// todo: add comments

import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {
    //
  },
  head() {
    return {
      title: "Users",
    };
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  computed: {
    users() {
      return this.$store.state.users.users;
    },
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch(
            "users/add",
            {
              $config: this.$config,
              params: values,
              onError: (e) => {
                console.log(e);
              },
              onSuccess: (e) => {
                this.$router.push(this.localePath( "/users" ));
              },
            },
            values
          );
        }
      });
    },
    handleSelectChange() {
      //
    },
  },
  created() {
    //
  },
  mounted() {
    //
  },
});
</script>