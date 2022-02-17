<template>
  <div>
    <h1>Collection Type list</h1>
    <a-dropdown>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-sub-menu  :title="'app:'+i" v-for="(col,i) in colGroup" :key="'col'+i">
          <a-sub-menu  :title="'db:'+i2" v-for="(col2,i2) in col" :key="'col-sub'+i2">
            <a-sub-menu  :title="'collection:'+i3" v-for="(col3,i3) in col2" :key="'col-sub-sub'+i3">              
              <a-menu-item v-for="item in col3" :key="item.id" @click="handleAdd(item)">{{item.type}}</a-menu-item>
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
import { defineComponent } from "@vue/composition-api";
const columns = [
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
];
export default defineComponent({
  setup() {
    //
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      groupCol:[],
      forms: [
        {
          form: "Product",
          id: 1,
        },
      ],
      colGroup:{}
    };
  },
  mounted() {
    this.getCollections();
  },
  computed: {
    collections(): any {
      return this.$store.state.collectionType.all;
    },
  },
  methods: {
    handleMenuClick (e:any)  {
      console.log(this.data)
    },
    handleAdd(i:any){
      console.log(this.$i18n)
      let route = this.localePath({name:'schemas-collectionType-add', params:{collectionType:i.id}})
      console.log(route)
      //this.$router.push(this.$i18n.localePath(`schemas/${i.id}/add`))
    },
    reducer(array:[],key:any){      
      return array.reduce( (r:any, a:any) =>{
        r[a[key]] = r[a[key]] || [];
        r[a[key]].push(a);
        return r;
      }, Object.create(null));
    },
    reduceCollection(d:any){
      
      let groupCol = this.reducer(d, 'omniflowapp')
      let n2,n3
      for (let [key, value] of Object.entries(groupCol)) {
        let v:any = value
        n2 = Object.assign({}, this.reducer(v,'database'))
        
        for (let [key2, value2] of Object.entries(n2)) {
          let v2:any = value2
          n3= Object.assign({},this.reducer(v2,'collection'))
          n2[key2]=n3
         
        }
        groupCol[key] = n2
      }     
      this.colGroup =  groupCol
    },
    getCollections() {
      this.loading = true;
      this.$store.dispatch("collectionType/all", {
        $config: this.$config,
        onError: (e: any) => {
          this.loading = false;
        },
        onSuccess: (d: any) => {
          this.reduceCollection(d)
          this.loading = false;
        },
      });
    },
  },
});
</script>
