<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit.prevent="handleSubmit"
    >
      <a-form-item label="Type">
        <a-input
          @input="handleChange"
          v-decorator="[
            'type',
            {
              rules: [
                { required: true, message: 'Please the type of collection' },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Database">
        <a-select v-decorator="['database']" @change="handleChange">
          <a-select-option v-for="db in dataBase" :key="db" :value="db">
            {{ db }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Collection">
        <a-select v-decorator="['collection']" @change="handleChange">
          <a-select-option
            v-for="(col, i) in $config.COLLECTION"
            :key="'col-' + i"
            :value="col"
          >
            {{ col }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Omniflowapp">
        <a-select v-decorator="['omniflowapp']" @change="handleChange">
          <a-select-option
            v-for="(app, i) in omniflowapp"
            :key="'app' + app + i"
            :value="app"
          >
            {{ app }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit" :disabled="$route.params.id && disableSubmit"> Submit </a-button>

        <a-button
          html-type="button"
          @click="$router.push(localePath('collectionType'))"
        >
          Cancel
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      dataForm: {},
      dataBase: this.$config.DB.split(";"),
      omniflowapp: this.$config.APPS.split(";"),
      disableSubmit:true
    };
  },
  computed: {
    collection(): any {
      return this.$store.state.collectionType.collection;
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.$store.dispatch("collectionType/get", {
        $config: this.$config,
        $id: this.$route.params.id,
        onSuccess: (e: any) => {
          this.form.setFieldsValue({
            type: e.type,
            description: e.description,
            database: this.dataBase[0],
            omniflowapp: e.omniflowapp,
            collection: this.$config.COLLECTION[0],
          });
        },
        onError(e:any){
          console.log(e)
        }
      });
    } else {
      this.form.setFieldsValue({
        database: this.dataBase[0],
        collection: this.$config.COLLECTION[0],
        omniflowapp: this.omniflowapp[0],
      });
    }
  },
  methods: {
    handleChange() {
      this.disableSubmit=false
    },
    openNotification(element:String, option:any) {
      let message
      let description
      if(element=='error'){
        message='Error'
        description = option
      }
      else if(element!='error' && this.$route.params.id=='edit'){
        message='Collection Type "' +
          this.collection.type.toUpperCase() +
          '" updated'
      }else{
        message='Collection Type "' +
          this.form.getFieldsValue().type.toUpperCase() +
          '" added'
      }
      this.$notification[element]({
        message: message,
        description: description,
        duration: 1,
      });
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.$route.params.id) {
            this.$store.dispatch(
              "collectionType/edit",
              {
                $config: this.$config,
                $id: this.$route.params.id,
                $values: this.form.getFieldsValue(),
                onError: (e: any) => {
                  this.openNotification('error', e);
                },
                onSuccess: (e: any) => {
                  this.openNotification('success',null);
                  this.$router.push(this.localePath("/collectionType"));
                },
              },
            );
          } else {
            this.$store.dispatch(
              "collectionType/add",
              {
                $config: this.$config,
                $values: this.form.getFieldsValue(),
                onError: (e: any) => {
                  this.openNotification('error', e)
                },
                onSuccess: (e: any) => {
                  this.openNotification('success', null);
                  this.$router.push(this.localePath("/collectionType"));
                },
              },
              values
            );
          }
        }
      });
    },
  },
});
</script>
<style scoped>
button {
  margin-right: 8px;
}
</style>
