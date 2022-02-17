<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit.prevent="useHandleSubmit"
    >
      <a-form-item label="Type">
        <a-input
          @input="useHandleChange"
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
        <a-select v-decorator="['database']" @change="useHandleChange">
          <a-select-option v-for="db in dataBase" :key="db" :value="db">
            {{ db }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Collection">
        <a-select v-decorator="['collection']" @change="useHandleChange">
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
        <a-select v-decorator="['omniflowapp']" @change="useHandleChange">
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
import { defineComponent, ref, getCurrentInstance, computed,reactive, onMounted,useRoute, useRouter } from "@nuxtjs/composition-api";
import CollectionType from '@COLLECTIONTYPE/types/CollectionType';
import { useCollectionTypeStore } from '@COLLECTIONTYPE/stores/useStore';

export default defineComponent({
  setup(){
    const store:any = useCollectionTypeStore();
    const instance:any = getCurrentInstance();
    const dataBase:any = ref(instance.proxy.$config.DB.split(";"));
    const omniflowapp:any = ref(instance.proxy.$config.APPS.split(";"));
    const disableSubmit:any = ref<Boolean>(true)
    const $route = useRoute()
    const $router: any = useRouter();

    const collection = computed(() => {
      return reactive<CollectionType[]>(store.collection);
    });

    onMounted(() => {
      let id =  $route.value.params.id
      if(id){
        store.useCollectionTypeItem(
          {
            $id:id, 
            onError: (e: any) => {
              //
            },
            onSuccess: (e: any) => {
              instance.proxy.form.setFieldsValue({
                type: e.type,
                description: e.description,
                database: dataBase.value[0],
                omniflowapp: e.omniflowapp,
                collection: instance.proxy.$config.COLLECTION[0],
              });
            }
          }
        )
      }else {
      instance.proxy.form.setFieldsValue({
        database: dataBase.value[0],
        collection: instance.proxy.$config.COLLECTION[0],
        omniflowapp: omniflowapp.value[0],
      });
    }
    });

    const useHandleChange = () => {
      disableSubmit.value=false
    };

    const useHandleSubmit = () => {
      instance.proxy.form.validateFields((err:any, values:any) => {
        if (!err) {
          if ( $route.value.params.id) {
            store.useCollectionTypeEdit(
              {
                $id: $route.value.params.id,
                $values: instance.proxy.form.getFieldsValue(),
                onError: (e: any) => {
                  openNotification('error', e)
                },
                onSuccess: (e: any) => {
                  openNotification('success', null);
                  $router.push($router.app.localePath("/collectionType"));
              }
            })
          } else {
            store.useCollectionTypeAdd(
              {
                $values: instance.proxy.form.getFieldsValue(),
                onError: (e: any) => {
                  openNotification('error', e)
                },
                onSuccess: (e: any) => {
                  openNotification('success', null);
                  $router.push($router.app.localePath("/collectionType"));
              }
            })
          }
        }
      });
    }

    const openNotification = (element:any, option:any) => {
      let message
      let description
      if(element=='error'){
        message='Error'
        description = option
      }
      
      else if(element!='error' && $route.value.params.id){
        let coll:any = collection.value
        message='Collection Type "' +
          coll.type.toUpperCase() +
          '" updated'
      }else{
        message='Collection Type "' +
          instance.proxy.form.getFieldsValue().type.toUpperCase() +
          '" added'
      }
      instance.proxy.$notification[element]({
        message: message,
        description: description,
        duration: 1,
      });
    }

    return {
      dataBase,
      omniflowapp,
      disableSubmit,
      useHandleChange,
      useHandleSubmit,
      collection
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  }
});
</script>
<style scoped>
button {
  margin-right: 8px;
}
</style>
