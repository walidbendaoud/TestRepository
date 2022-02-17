<template>
  <div>
    <h1>Collection Type list</h1>
    <a-dropdown>
      <a-menu slot="overlay" @click="useHandleMenuClick">
        <a-sub-menu  :title="'app:'+i" v-for="(col,i) in useReduceCollection(collections)" :key="'col'+i">
          <a-sub-menu  :title="'db:'+i2" v-for="(col2,i2) in col" :key="'col-sub'+i2">
            <a-sub-menu  :title="'collection:'+i3" v-for="(col3,i3) in col2" :key="'col-sub-sub'+i3">              
              <a-menu-item v-for="item in col3" :key="item.id" @click="useHandleAdd(item)">{{item.type}}</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
        </a-sub-menu>
        
      </a-menu>
      <a-button style="margin-left: 8px">
        Add Schema <a-icon type="down" />
      </a-button>
    </a-dropdown>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="forms"
      :pagination="pagination"
      :loading="loading"
    >
      <span slot="action" slot-scope="text, record">
        <nuxt-link :to="localePath('/schemas/' + record.id)">Edit</nuxt-link>
      </span>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref, computed, reactive, onMounted, useRouter } from "@nuxtjs/composition-api";
import { useCollectionTypesList } from '@COLLECTIONTYPE/composable/useCollectionType';
import { useCollectionTypeStore } from '@COLLECTIONTYPE/stores/useStore';
import CollectionType from '@COLLECTIONTYPE/types/CollectionType';

export default defineComponent({
  setup() {
    const columns = ref([
      {
        title: "Form type",
        dataIndex: "form",
        width: "70%",
        scopedSlots: { customRender: "form" },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "right",
        scopedSlots: { customRender: "action" },
      },
    ]);
    const store:any = useCollectionTypeStore();
    const { useGetData, loading } = useCollectionTypesList();
    const $router: any = useRouter();
    const colGroup:any = ref<Object>({})
    const groupCol:any = ref<Object[]>([])
    const pagination:Object = ref<Object>({})
    const forms:any = ref<Object[]>([
        {
          form: "Product",
          id: 1,
        },
      ])

    const collections = computed(() => {
      return reactive<CollectionType[]>(store.collections);
    });

    let reducer = (array:[],key:any)=>{      
      return array.reduce( (r:any, a:any) =>{
        r[a[key]] = r[a[key]] || [];
        r[a[key]].push(a);
        return r;
      }, Object.create(null));
    }

    const useReduceCollection = (d:any)=>{      
      let groupCol = reducer(d, 'omniflowapp')
      let n2,n3
      for (let [key, value] of Object.entries(groupCol)) {
        let v:any = value
        n2 = Object.assign({}, reducer(v,'database'))
        
        for (let [key2, value2] of Object.entries(n2)) {
          let v2:any = value2
          n3= Object.assign({},reducer(v2,'collection'))
          n2[key2]=n3
         
        }
        groupCol[key] = n2
      }     
      return groupCol
    }

    const useHandleAdd = (i:any)=> {
      $router.push($router.app.localePath({name:'schemas-collectionType-add', params:{collectionType:i.id}}));
    }

    const useHandleMenuClick = (e:any) => {
     //
    }

    onMounted(() => {
      useGetData();
    });

    return {
      colGroup,
      groupCol,
      loading,
      forms,
      columns,
      collections,
      pagination,
      useHandleAdd,
      useReduceCollection,
      useHandleMenuClick
    }
  }
});
</script>
